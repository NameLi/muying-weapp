const computedBehavior = require('miniprogram-computed').behavior

module.exports = Behavior({
  behaviors: [computedBehavior],

  data: {
    id: null,
    loading: false,
    noData: false,
    noMoreData: false,
    form: {},
    list: [],
    total: 0,
    page: 1,
    per_page: 20,
    _isError: false,
  },

  computed: {
    isShowSkeleton(data) {
      return data.loading && data.page === 1;
    }
  },

  ready() {
    this.loadMore()
  },

  methods: {
    // 重置data数据
    resetData() {
      if (this.data.loading) return;

      this.setData({
        loading: false,
        page: 1,
        list: [],
        total: 0,
        noData: false,
        noMoreData: false,
        _isError: false,
      })

      this.loadMore();
    },


    // 加载更多数据
    async getData(fn, ...args) {
      if (this.data._isError) return;

      if (this.data.noMoreData && this.data.page === 1 && this.data.list.length === 0) {
        this.setData({
          noMoreData: false
        })
      }

      if (this.data.loading || this.data.noMoreData) return;

      this.setData({ loading: true })

      let params = {
        page: this.data.page,
        per_page: this.data.per_page,
        ...this.data.form
      };

      const { code, data, total } = await fn(...args, params);

      wx.stopPullDownRefresh();

      if (code === 200) {
        let noData = false;

        if (this.data.page === 1 && data.length === 0) {
          noData = true;
        } else {
          noData = false;
        }

        this.data._isError = false;

        if (data.length !== this.data.per_page) {
          this.setData({
            noMoreData: true
          })
        }

        this.data.list.push(...data)

        this.setData({
          noData,
          list: this.data.list,
          page: ++this.data.page,
          total: total || 0,
        })

      } else {
        this.data._isError = true;
      }

      wx.nextTick(() => {
        this.setData({
          loading: false
        })
      });
    },
  }
})
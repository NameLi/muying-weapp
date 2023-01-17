import { HOST } from "../../../../config"
const app = getApp()

Component({
  behaviors: [wx.computedBehavior],

  options: {
    styleIsolation: "shared",
  },

  properties: {
    keyword: {
      type: String
    }
  },

  data: {
    loading: false,
    cancel: null,
    per_page: 20,
    type: "movie",
    movies: [],
    actors: [],
    roles: [],
    moviePage: 1,
    actorPage: 1,
    rolePage: 1,
    movieTotal: 0,
    actorTotal: 0,
    roleTotal: 0,
    movieTop: 0,
    actorTop: 0,
    roleTop: 0,
    movieNoMoreData: false,
    actorNoMoreData: false,
    roleNoMoreData: false,
    isShowLoading: false
  },

  watch: {
    keyword(val) {
      if (val) {
        this.refreshSearch();
      }
    },
  },

  methods: {
    refreshSearch() {
      this.setData({
        movieNoMoreData: false,
        actorNoMoreData: false,
        roleNoMoreData: false,

        movies: [],
        actors: [],
        roles: [],

        moviePage: 1,
        actorPage: 1,
        rolePage: 1,

        movieTotal: 0,
        actorTotal: 0,
        roleTotal: 0,

        movieTop: 0,
        actorTop: 0,
        roleTop: 0,
      })

      this.doSearch();
    },

    // 选中记录关键字
    checkedHandle() {
      const keyword = this.data.keyword;
      this.triggerEvent("keyword-change", keyword);
    },

    typeChange(e) {
      if (this.data.cancel) {
        this.data.cancel.abort();
        this.data.cancel = null;
      }

      const type = e.currentTarget.dataset.type;

      wx.createSelectorQuery().selectViewport().scrollOffset((res) => {
        const scrollTop = res.scrollTop;

        // 保存当前页面滑动高度
        this.data[this.data.type + "Top"] = scrollTop;

        this.setData({
          type
        }, () => {
          wx.nextTick(() => {
            wx.pageScrollTo({
              scrollTop: this.data[type + "Top"],
              duration: 0
            })
          })
        })

        if (this.data[this.data.type + "Total"] === 0) {
          this.doSearch();
        }
      }).exec()
    },

    doSearch: app.debounce(function () {
      if (this.data.keyword) {
        this.search();
      }
    }),

    // 搜索
    async search() {
      if (this.data[this.data.type + "NoMoreData"]) return;
      
      this.setData({
        loading: true
      })
      
      if (this.data[this.data.type + "Total"] === 0) {
        this.setData({
          isShowLoading: true
        })
      }
      
      if (this.data.cancel) {
        this.data.cancel.abort();
        this.data.cancel = null;
      }
      
      let page = 1;
      if (this.data.type === "actor") {
        page = this.data.actorPage;
      } else if (this.data.type === "role") {
        page = this.data.rolePage;
      } else {
        page = this.data.moviePage;
      }

      let params = {
        page,
        keyword: this.data.keyword,
        type: this.data.type,
      };

      this.data.cancel = wx.request({
        url: HOST + '/search',
        data: params,
        header: {
          'content-type': 'application/json',
          Authorization: 'Bearer ' + wx.getStorageSync('token')
        },
        success: (res) => {

          const {
            code,
            data,
            total
          } = res.data

          if (code === 200) {
            switch (this.data.type) {
              case "actor":
                const actors = this.data.actors.concat(data);
                this.setData({
                  actors,
                  actorPage: ++this.data.actorPage,
                  actorTotal: total
                })
                break;
              case "role":
                const roles = this.data.roles.concat(data);
                this.setData({
                  roles,
                  rolePage: ++this.data.rolePage,
                  roleTotal: total
                })
                break;
              default:
                const movies = this.data.movies.concat(data);
                this.setData({
                  movies,
                  moviePage: ++this.data.moviePage,
                  movieTotal: total
                })
                break;
            }

            if (data.length < this.data.per_page) {
              this.data[this.data.type + "NoMoreData"] = true;
            }

            this.data.cancel = null
          }

          this.setData({
            loading: false
          })
          this.setData({
            isShowLoading: false
          })
        },
        fail: (err) => {
          console.warn(err)

          this.setData({
            loading: false
          })
          this.setData({
            isShowLoading: false
          })
        }
      })
    },
  }
})
import { getComments } from "../../api/common"

Component({

  behaviors: [wx.getInfiniteData],

  properties: {
    _id: {
      type: Number,
    },
    type: {
      type: String
    },
    // height: {
    //   type: String,
    //   value: ""
    // }
  },

  data: {
    round: true,
    form: {
      sortby: "hot",
    },
    height: "0",
  },

  attached() {
    const routes = getCurrentPages();
    const currentPage = routes[routes.length - 1];

    const windowInfo = wx.getWindowInfo()
    const { screenHeight, windowHeight } = windowInfo;

    // 自定义导航栏
    if (screenHeight === windowHeight) {
      let customBarH = 44;
      let capsule = wx.getMenuButtonBoundingClientRect();
      if (capsule) {
        customBarH = capsule.bottom + 4;
      }
      let topH = customBarH + 20 + 'px';

      this.setData({
        height: `calc(100vh - ${topH})`
      })
    } else {
      if (currentPage.name === 'video') {
        let topH = '423rpx';

        this.setData({
          round: false,
          height: `calc(100vh - ${topH})`
        })
      } else {
        this.setData({
          height: 'calc(100vh - 40px)'
        })
      }
    }
  },

  methods: {
    // 关闭
    close() {
      this.triggerEvent('close')
    },

    // 切换类型
    onChange(e) {
      const value = e.detail;
      if (this.data.form.sortby === value) return;
      this.setData({
        page: 1,
        list: [],
        'form.sortby': value
      })

      this.loadMore();
    },
    // 获取评论
    getComments() {
      this.setData({
        page: 1,
        list: [],
      })
      this.loadMore();
    },

    loadMore() {
      this.getData(getComments, this.data.type, this.data._id);
    },

    // 显示操作表单
    showActionSheetHandle(e) {
      this.selectComponent('#action-sheet').show(e.detail)
    },

    // 删除评论
    deleteHandle(e) {
      const comment = e.detail;
      const index = this.data.list.findIndex((c) => c.id === comment.id);
      if (index > -1) {
        const key = 'list[' + index + ']';

        this.setData({
          [key]: Object.assign(this.data.list[index], comment)
        })
      }
    },
  }
})

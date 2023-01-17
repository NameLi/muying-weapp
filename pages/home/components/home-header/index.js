const app = getApp()

Component({
  properties: {
    // 当前页面滚动是否未超过阈值
    isTop: {
      type: Boolean,
      value: true
    }
  },

  data: {
    headerBarH: app.globalData.headerBarH,
    statusBarH: app.globalData.statusBarH,
    titleBarH: app.globalData.titleBarH,
    searchBarH: app.globalData.capsuleH,
    capsuleW: app.globalData.capsuleW,
  },

  methods: {
    pathToSearch() {
      wx.navigateTo({
        url: '/pages/search/index',
      })
    }
  }
})
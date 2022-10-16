Component({
  properties: {
    user: {
      type: Object,
      required: true,
    },
  },

  methods: {
    // 跳转到我的信息设置
    pathToInfo() {
      wx.navigateTo({
        url: '/pages/profile/information/index',
      })
    },

    // 跳转登录页
    pathToLogin() {
      wx.navigateTo({
        url: '/pages/account/login/index',
      })
    }
  }
})
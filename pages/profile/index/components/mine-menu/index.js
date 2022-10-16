Component({
  properties: {
    count: {
      type: Object,
      required: true,
    },
    isLogin: {
      type: Boolean,
    },
  },

  methods: {
    pathTo(e) {
      const type= e.currentTarget.dataset.type;

      if (this.data.isLogin) {
        wx.navigateTo({
          url: `/pages/profile/collection/${type}/index`,
        })
      } else {
        wx.navigateTo({
          url: '/pages/account/login/index',
        })
      }
    },
  }
})
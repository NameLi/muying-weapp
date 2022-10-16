Component({
  methods: {
    navigateTo(e) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      })
    }
  }
})
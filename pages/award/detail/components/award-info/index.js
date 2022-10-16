Component({
  properties: {
    award: {
      type: Object,
    }
  },

  methods: {
    pathTo() {
      wx.navigateTo({
        url: `/pages/award/detail/info/index?name=${this.data.award.name}`,
      })
    },
  }
})

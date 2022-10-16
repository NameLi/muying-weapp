Component({

  properties: {
    _id: {
      type: Number
    },
    award: {
      type: Object,
    },
    awardCount: {
      type: Number,
    },
  },

  methods: {
    pathTo() {
      wx.navigateTo({
        url: `/pages/actor/award/index?id=${this.data._id}`
      })
    }
  }
})

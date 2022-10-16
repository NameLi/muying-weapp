const app = getApp()

Component({
  behaviors: [wx.computedBehavior],

  properties: {
    review: {
      type: Object,
      required: true,
    }
  },

  computed: {
    author(data) {
      return data.review?.author;
    },
    created_at(data) {
      return app.dateBefore(data.review?.created_at)
    }
  },

  methods: {
    pathTo() {
      wx.navigateTo({
        url: `/pages/review/detail/index?id=${this.data.review.id}`
      })
    }
  }
})

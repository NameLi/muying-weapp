const app = getApp()

Component({
  properties: {
    movie: {
      type: Object,
    },
  },

  methods: {
    pathTo() {
      app.movie = this.data.movie;

      wx.navigateTo({
        url: `/pages/movie/detail/index/index?id=${this.data.movie.id}`
      })
    }
  }
})

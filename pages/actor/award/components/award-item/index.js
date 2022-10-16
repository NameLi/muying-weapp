const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },

  properties: {
    award: {
      type: Object,
      required: true,
    },
  },

  methods: {
    pathToMovie(e) {
      const movie = e.currentTarget.dataset.movie;
      app.movie = movie;

      wx.navigateTo({
        url: `/pages/movie/detail/index/index?id=${movie.id}`
      })
    }
  }
})

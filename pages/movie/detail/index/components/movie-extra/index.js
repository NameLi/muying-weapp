Component({
  properties: {
    movie: {
      type: Object,
      required: true,
    },
  },

  methods: {
    pathTo(e) {
      const type = e.currentTarget.dataset.type;
      const id = this.data.movie.id;

      wx.navigateTo({
        url: `/pages/movie/detail/${type}/index?id=${id}`
      })
    }
  }
})

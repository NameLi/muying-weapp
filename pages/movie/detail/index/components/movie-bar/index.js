Component({

  properties: {
    movie: {
      type: Object,
    },
  },

  methods: {
    showFavoriteModal() {
      this.triggerEvent('show-favorite')
    },

    showCommentModal() {
      this.triggerEvent('show-comment')
    },

    pathToReview() {
      const id = this.data.movie.id;

      wx.navigateTo({
        url: `/pages/movie/detail/review/index?id=${id}`
      })
    }
  }
})

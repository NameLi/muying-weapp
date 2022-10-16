

Component({
  behaviors: [wx.computedBehavior],

  properties: {
    movie: {
      type: Object,
      required: true,
    },
  },

  data: {
    visible: false,
  },

  computed: {
    imdb(data) {
      return data.movie.thrid_rating?.imdb || { rating: 0, count: 0 };
    },
    douban(data) {
      return data.movie.thrid_rating?.douban || { rating: 0, count: 0 };
    },
  },

  methods: {
    // 豆瓣评分描述
    showDoubanRatingTip() {
      this.setData({
        visible: true
      })
    },

    handleConfirm() {
      this.setData({
        visible: false
      })
    },

    // 评分详情
    pathToRate() {
      this.triggerEvent('show-rate', true)
    },
  }
})

const app = getApp()

function arrayToString(array) {
  if (typeof array === 'string' && array.includes(',')) {
    array = array.split(',');
  }
  return Array.isArray(array) ? array.join(" / ") : array
}

Component({
  behaviors: [wx.computedBehavior],

  properties: {
    movie: {
      type: Object,
      require: true,
    },
    loading: {
      type: Boolean,
    }
  },

  data: {
    headerBarH: app.globalData.customBarH
  },

  computed: {
    isEpisode(data) {
      return data.movie.episode_count > 0;
    },
    poster(data) {
      return typeof data.movie.poster === "object"
        ? data.movie.poster.small
        : data.movie.poster;
    },
    countries(data) {
      return arrayToString(data.movie.countries)
    },
    genres(data) {
      return arrayToString(data.movie.genres)
    },
    durations(data) {
      return arrayToString(data.movie.durations)
    },
    languages(data) {
      return arrayToString(data.movie.languages)
    },
    pubdates(data) {
      return arrayToString(data.movie.pubdates)
    }
  },

  methods: {
    // 显示更多信息
    showDetailModal() {
      this.triggerEvent("show-detail")
    },

    // 想看
    userMovieWish() {
      this.triggerEvent("wish-change");
    },

    // 评分
    pathToRate() {
      this.triggerEvent('show-rate', 'create');
    },

    // 查看我的评分
    pathToRateEdit() {
      this.triggerEvent('show-rate', 'edit');
    },

    // 奖项
    pathToAward() {
      wx.navigateTo({
        "url": `../award/index?id=${this.data.movie.id}`
      })
    }
  }
})

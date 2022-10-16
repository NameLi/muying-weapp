const app = getApp()

Component({
  options: {
    styleIsolation: 'apply-shared'
  },

  behaviors: [wx.computedBehavior],

  properties: {
    movie: {
      type: Object,
      required: true,
    },
    isComing: {
      type: Boolean,
      value: false,
    },
  },

  computed: {
    isShowCategory(data) {
      if (data.movie) {
        return data.movie.category && data.movie.category !== "电影";
      } else {
        return false;
      }
    },
  },

  methods: {
    pathTo() {
      this.triggerEvent("on-checked", this.data.movie);

      app.movie = this.data.movie;

      wx.navigateTo({
        url: `/pages/movie/detail/index/index?id=${this.data.movie.id}`
      })
    },
  }
})

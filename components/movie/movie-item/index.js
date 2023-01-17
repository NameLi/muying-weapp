const app = getApp()

Component({
  behaviors: [wx.computedBehavior],

  options: {
    addGlobalClass: true,
  },

  properties: {
    movie: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
    isComing: {
      type: Boolean,
      value: false,
    },
    keyword: {
      type: String,
      value: ""
    },
  },

  computed: {
    title(data) {
      return '<div class="title">' + data.movie.title.replace(data.keyword, `<span class="keyword">${data.keyword}</span>`) + '</div>';
    },
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
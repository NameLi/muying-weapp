const app = getApp()

Component({
  externalClasses: ['article-class'],

  options: {
    addGlobalClass: true,
  },
  
  behaviors: [wx.computedBehavior],

  properties: {
    article: {
      type: Object,
      required: true,
    },
  },

  computed: {
    author(data) {
      return data.article?.author;
    },
    created_at(data) {
      return app.dateBefore(data.article?.created_at)
    }
  },
  
  methods: {
    pathTo() {
      wx.navigateTo({
        url: `/pages/article/detail/index?id=${this.data.article.id}`
      })
    }
  }
})

import {
  getArticle
} from "../../../api/article"

Page({

  behaviors: [wx.computedBehavior],

  data: {
    loading: true,
    id: null,
    article: {
      movie: {},
      author: {},
      content: ""
    },
    scrollTop: 0,
  },

  computed: {
    author(data) {
      return data.article?.author;
    },
    isShowHeaderAuthor(data) {
      return data.scrollTop > 70;
    },
    content(data) {
      return data.article.content.replace(/<img/g, "<img class='img'")
    }
  },

  onLoad(options) {
    this.data.id = options.id
    this.getArticle();
  },

  async getArticle() {
    this.setData({
      loading: true
    });
    const {
      code,
      data
    } = await getArticle(this.data.id);
    this.setData({
      loading: false
    });

    if (code === 200) {
      this.setData({
        article: data
      })
    }

    wx.stopPullDownRefresh();
  },

  onPageScroll({
    scrollTop
  }) {
    this.setData({
      scrollTop
    })
  },

  onPullDownRefresh() {
    this.getArticle();
  },

  onShareAppMessage() {

  }
})
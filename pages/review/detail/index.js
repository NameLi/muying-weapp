import { getReview } from "../../../api/review"

Page({

  behaviors: [wx.computedBehavior],

  data: {
    id: null,
    loading: true,
    review: {},
    scrollTop: 0,
  },

  computed: {
    author(data) {
      return data.review.author || null;
    },
    isShowHeaderAuthor(data) {
      return data.scrollTop > 70;
    },
  },

  onLoad(options) {
    this.data.id = options.id;
    this.getReview();
  },

  async getReview() {
    this.setData({
      loading: true
    })
    const { code, data } = await getReview(this.data.id);
    if (code === 200) {
      this.setData({
        review: data
      }, () => {
        this.setData({
          loading: false
        })
      })
    }

    wx.stopPullDownRefresh()
  },

  copyText(e) {
    const text = e.currentTarget.dataset.text
    wx.setClipboardData({
      data: text,
      success(res) {

      }
    })
  },

  onPageScroll({ scrollTop }) {
    this.setData({
      scrollTop
    })
  },

  onPullDownRefresh() {
    this.getReview();
  },
})
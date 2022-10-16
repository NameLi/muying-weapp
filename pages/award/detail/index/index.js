import { getAward } from "../../../../api/award"

Page({
  data: {
    loading: false,
    name: "",
    award: {},
    scrollTop: 0
  },

  onLoad(options) {
    this.data.name = options.name
    this.getAward();
  },

  async getAward() {
    this.setData({ loading: true });
    const { code, data } = await getAward(this.data.name);
    this.setData({ loading: false });

    if (code === 200) {
      this.setData({
        award: data
      })
    }
  },

  pathToSession(e) {
    const session = e.target.dataset.session;

    wx.navigateTo({
      url: `/pages/award/session/index?name=${this.data.name}&session=${session}`,
    })
  },

  onPageScroll({ scrollTop }) {
    this.setData({
      scrollTop
    })
  },
})
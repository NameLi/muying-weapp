import { getAwardSession } from "../../../api/award"

Page({
  data: {
    name: "",
    session: null,
    loading: false,
    award: {},
  },

  onLoad(options) {
    this.data.name = options.name
    this.data.session = options.session
    this.getAwardSession();
  },

  async getAwardSession() {
    this.setData({ loading: true });
    const { code, data, message } = await getAwardSession(this.data.name, this.data.session);
    wx.stopPullDownRefresh();

    if (code === 200) {
      this.setData({
        award: data
      })
    }

    this.setData({ loading: false });
  },

  onPullDownRefresh() {
    this.getAwardSession();
  }
})
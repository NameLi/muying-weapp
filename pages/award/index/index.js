import { getAwards } from "../../../api/award"

Page({
  data: {
    loading: false,
    awards: [],
  },

  onLoad() {
    this.getAwards();
  },

  async getAwards() {
    this.setData({ loading: true });
    const { code, data } = await getAwards();
    this.setData({ loading: false });

    if (code === 200) {
      this.setData({
        awards: data
      })
    }
  },

  pathTo(e) {
    const name = e.currentTarget.dataset.name;

    wx.navigateTo({
      url: '/pages/award/detail/index/index?name=' + name,
    })
  },
})
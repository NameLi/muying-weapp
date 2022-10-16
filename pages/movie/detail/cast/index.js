import { getMovieCast } from "../../../../api/movie";

Page({

  data: {
    id: null,
    loading: false,
    cast: [],
  },

  onLoad(options) {
    this.data.id = options.id;
    this.getMovieCast();
  },

  async getMovieCast() {
    this.setData({ loading: true })
    const { code, data } = await getMovieCast(this.data.id);

    if (code === 200) {
      this.setData({
        cast: data
      }, () => {
        this.setData({ loading: false })
      })
    }

    wx.stopPullDownRefresh();
  },

  onPullDownRefresh() {
    this.getMovieCast();
  },
})
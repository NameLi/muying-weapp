import { getMovieSerials } from "../../../../api/movie";
Page({
  data: {
    loading: false,
    id: null,
    serials: [],
  },

  onLoad(options) {
    this.data.id = options.id;
    this.getMovieSerials();
  },

  async getMovieSerials() {
    this.setData({ loading: true });
    const { code, data } = await getMovieSerials(this.data.id);
    this.setData({ loading: false });

    if (code === 200) {
      this.setData({
        serials: data
      })
    }

    wx.stopPullDownRefresh();
  },

  onPullDownRefresh() {
    this.getMovieSerials();
  },
})
import { getMovieCompanies } from "../../../../api/movie";

Page({

  data: {
    loading: false,
    id: null,
    list: [],
  },

  onLoad(options) {
    this.data.id = options.id;
    this.getMovieCompanies()
  },

  async getMovieCompanies() {
    this.setData({ loading: true });
    const { code, data } = await getMovieCompanies(this.data.id);
    this.setData({ loading: false });

    wx.stopPullDownRefresh();

    if (code === 200) {
      this.setData({
        list: data
      })
    }
  },

  onPullDownRefresh() {
    this.getMovieCompanies();
  },
})
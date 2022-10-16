import { getSerialMovies } from "../../../../api/serial";

Page({
  data: {
    loading: false,
    scrollTop: 0,
    serial: {
      movies: [],
    },
  },

  onLoad(options) {
    this.getSerialMovies(options.id)
  },

  async getSerialMovies(id) {
    this.setData({ loading: true });
    const { code, data } = await getSerialMovies(id);
    this.setData({ loading: false });

    if (code === 200) {
      this.setData({
        serial: data
      })
    }
  },

  onPageScroll({ scrollTop }) {
    this.setData({
      scrollTop
    })
  },
})
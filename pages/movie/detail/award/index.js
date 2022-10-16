import { getMovieAwards } from "../../../../api/movie";

Page({

  data: {
    id: null,
    loading: false,
    awards: [],
  },

  onLoad(options) {
    this.data.id = options.id;
    this.getMovieAwards();
  },

  async getMovieAwards() {
    this.setData({ loading: true })
    const { code, data } = await getMovieAwards(this.data.id);
    this.setData({ loading: false })

    if (code === 200) {
      this.setData({
        awards: data
      })
    }
  }
})
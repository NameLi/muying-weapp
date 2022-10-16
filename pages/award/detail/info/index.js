import { getAward } from "../../../../api/award";

Page({
  data: {
    name: "",
    award: {},
  },

  onLoad(options) {
    this.getAward(options.name);
  },

  async getAward(name) {
    this.setData({ loading: true });
    const { code, data } = await getAward(name);
    this.setData({ loading: false });

    if (code === 200) {
      this.setData({
        award: data
      })
    }
  },
})
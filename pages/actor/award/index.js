import { getActorAwards } from "../../../api/actor"

Page({
  data: {
    loading: true,
    awards: [],
  },

  onLoad(options) {
    this.getActorAwards(options.id);
  },

  async getActorAwards(id) {
    this.setData({ loading: true })
    const { code, data } = await getActorAwards(id);
    
    if (code === 200) {
      this.setData({
        awards: data
      }, () => {
        this.setData({ loading: false })
      })
    }
  }
})
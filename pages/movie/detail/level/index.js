import { getMovieLevels } from "../../../../api/movie";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getMovieLevels, this.data.id);
  },
})
import { getMoviePubdates } from "../../../../api/movie";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getMoviePubdates, this.data.id);
  }
})
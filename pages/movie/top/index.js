import { getMovieTop } from "../../../api/api";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getMovieTop);
  }
})
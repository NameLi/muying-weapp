import { getMovieTheater } from "../../../api/api";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getMovieTheater);
  }
})
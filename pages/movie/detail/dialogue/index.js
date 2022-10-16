import { getMovieDialogues } from "../../../../api/movie";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getMovieDialogues, this.data.id);
  }
})
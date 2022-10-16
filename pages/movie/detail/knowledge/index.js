import { getMovieKnowledges } from "../../../../api/movie";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getMovieKnowledges, this.data.id);
  }
})
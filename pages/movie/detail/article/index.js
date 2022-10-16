import { getMovieArticles } from "../../../../api/movie";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getMovieArticles, this.data.id);
  }
})
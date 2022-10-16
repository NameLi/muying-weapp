import { getMovieRoles } from "../../../../api/movie";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getMovieRoles, this.data.id);
  }
})
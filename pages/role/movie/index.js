import { getRoleMovies } from "../../../api/role";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getRoleMovies, this.data.id);
  }
})
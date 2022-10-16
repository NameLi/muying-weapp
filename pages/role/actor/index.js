import { getRoleActors } from "../../../api/role";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getRoleActors, this.data.id);
  }
})
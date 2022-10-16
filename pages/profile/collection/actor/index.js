import { getUserCollection } from "../../../../api/user";

Page({
  behaviors: [wx.getInfiniteData],

  loadMore() {
    this.getData(getUserCollection, "actors");
  }
})
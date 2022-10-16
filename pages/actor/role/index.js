import { getActorRoles } from "../../../api/actor"

Page({
  behaviors: [wx.getInfiniteData],

  data: {
    form: {
      sortby: "hot",
    },
  },

  onChange(e) {
    const sortby = e.detail;

    if (this.data.form.sortby === sortby) return;

    this.setData({
      page: 1,
      list: [],
      'form.sortby': sortby
    })

    this.loadMore();
  },

  loadMore() {
    this.getData(getActorRoles, this.data.id);
  }
})
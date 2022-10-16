import { getActorWorks } from "../../../api/actor"

Page({
  behaviors: [wx.getInfiniteData],

  data: {
    tabs: [
      {
        label: "热度",
        value: "hot",
      },
      {
        label: "时间",
        value: "year",
      },
      {
        label: "评分",
        value: "rating",
      },
    ],
    form: {
      sortby: "hot",
    },
    per_page: 21,
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
    this.getData(getActorWorks, this.data.id);
  }
})
import { getMovieToday } from "../../../api/api";

Page({
  behaviors: [wx.getInfiniteData],

  data: {
    form: {
      sortby: "hot",
    },
  },

  typeChangeHandle(e) {
    if (this.data.loading) return;

    const name = e.currentTarget.dataset.type;

    this.setData({
      'form.sortby': name,
      page: 1,
      list: []
    })
    this.loadMore();
  },

  loadMore() {
    this.getData(getMovieToday);
  }
})
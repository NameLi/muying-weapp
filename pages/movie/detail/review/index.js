import { getMovieReviews } from "../../../../api/movie";

Page({
  behaviors: [wx.getInfiniteData],

  data: {
    form: {
      sortby: "hot",
    },
  },

  onChange(e) {
    const value = e.detail;
    if (this.data.form.sortby === value) return;

    this.setData({
      page: 1,
      list: [],
      'form.sortby': value
    })

    this.loadMore();
  },

  loadMore() {
    this.getData(getMovieReviews, this.data.id);
  }
})
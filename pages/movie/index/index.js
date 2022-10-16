import { getMovies } from "../../../api/movie";

Page({
  behaviors: [wx.getInfiniteData],

  data: {
    scrollTop: 0,
    per_page: 21,
  },

  searchChange({ detail }) {
    this.setData({
      loading: false,
      list: [],
      page: 1,
      noMoreData: false,
      form: detail
    })

    this.loadMore();
  },

  loadMore() {
    this.getData(getMovies);
  },

  onPageScroll({ scrollTop }) {
    this.setData({
      scrollTop
    })
  }
})
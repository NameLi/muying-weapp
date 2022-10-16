import { getMovieComing } from "../../../api/api";

Page({
  behaviors: [wx.computedBehavior, wx.getInfiniteData],

  computed: {
    // 电影按日期分组
    groups(data) {
      let groups = [];
      data.list.map((movie) => {
        const gLen = groups.length;
        if (gLen && movie.release_date === groups[gLen - 1].date) {
          groups[gLen - 1].children.push(movie);
        } else {
          const group = {
            date: movie.release_date,
            children: [movie],
          };
          groups.push(group);
        }
      });

      return groups;
    },
  },

  loadMore() {
    this.getData(getMovieComing);
  }
})
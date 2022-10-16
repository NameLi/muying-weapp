import { getMoviePhotos } from "../../api/movie";
import { getActorPhotos } from "../../api/actor";
import { getRolePhotos } from "../../api/role";

Page({
  behaviors: [wx.getInfiniteData],

  data: {
    id: null,
    request: null,
    type: "",
    form: {
      type: "all",
    },
    navs: [],
  },

  onLoad(options) {
    this.data.type = options.type;
    this.data.id = options.id

    let navs = []
    let request = null;

    switch (this.data.type) {
      case "movie":
        request = getMoviePhotos;
        navs = [
          {
            title: "全部",
            name: "all",
          },
          {
            title: "海报",
            name: "poster",
          },
          {
            title: "剧照",
            name: "still",
          },
          {
            title: "其它",
            name: "other",
          },
        ];
        break;
      case "actor":
        request = getActorPhotos;
        navs = [
          {
            title: "全部",
            name: "all",
          },
          {
            title: "写真",
            name: "portrait",
          },
          {
            title: "截图",
            name: "cut",
          },
          {
            title: "其它",
            name: "other",
          },
        ];
        break;
      case "role":
        request = getRolePhotos;
        navs = [
          {
            title: "全部",
            name: "all",
          },
          {
            title: "海报",
            name: "poster",
          },
          {
            title: "截图",
            name: "cut",
          },
          {
            title: "其它",
            name: "other",
          },
        ];
        break;
    }

    this.setData({
      request,
      navs
    })
  },

  tabChange(e) {
    const type = e.detail;

    this.setData({
      'form.type': type,
      page: 1,
      list: [],
    })

    this.loadMore();
  },

  loadMore() {
    this.getData(this.data.request, this.data.id);
  },

  // 预览
  preview(e) {
    const index = e.currentTarget.dataset.index;
    const urls = this.data.list.map(p => p.url.replace(/@mini/, '@larger'))
    const current = urls[index]

    wx.previewImage({
      current,
      urls
    })
  },
})
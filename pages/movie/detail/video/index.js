import { getMovieVideos } from "../../../../api/movie";

Page({

  behaviors: [wx.computedBehavior],

  data: {
    id: null,
    loading: false,
    videos: [],
    movie: {},
    videoList: []
  },

  onLoad(options) {
    this.data.id = options.id;
    this.getMovieVideos();
  },

  typeChange({ detail }) {
    this.updateVideoList(detail)
  },

  updateVideoList(type = 'trailer') {
    let currentType = this.data.videos.find(
      (v) => v.type_en === type
    );

    if (currentType) {
      this.setData({
        videoList: currentType["children"]
      })
    } else {
      this.setData({
        videoList: []
      })
    }
  },

  async getMovieVideos() {
    this.setData({ loading: true })
    const { code, data } = await getMovieVideos(this.data.id);
    this.setData({ loading: false })

    if (code === 200) {
      this.setData({
        movie: data.movie,
        videos: data.videos
      })

      this.updateVideoList()
    }
  }
})
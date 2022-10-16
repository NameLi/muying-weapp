import { getVideo } from "../../../api/video"
import { getMovieVideos } from "../../../api/movie"

Page({
  behaviors: [wx.computedBehavior],
  name: "video",
  data: {
    id: null,
    loading: false,
    movieLoading: false,
    video: {
      movie: {},
      author: {},
      comment_count: 0,
    },
    videos: [],
    currentTypeEn: "trailer",
  },

  computed: {
    videoList(data) {
      let currentType = data.videos.find(
        (v) => v.type_en === data.currentTypeEn
      );

      if (currentType) {
        return currentType["children"];
      } else {
        return [];
      }
    },
  },

  onLoad(options) {
    this.getVideo();
    this.getMovieVideos();

    this.getNetworkType();
  },

  goback() {
    wx.navigateBack();
  },

  // 获取网络类型，使用流量时第一次给提示，且显示视频耗流量大小
  getNetworkType() {
    wx.getNetworkType({
      success({ networkType }) {
        if (networkType === 'none') {
          wx.$toast('请检查网络')
          return;
        }
        if (networkType !== 'wifi') {
          wx.$toast('当前使用移动网络，请注意流量消耗')
          return;
        }
      }
    })
  },

  // 获取视频详情
  async getVideo() {
    this.setData({ loading: true });
    const { code, data } = await getVideo(this.data.id);
    this.setData({ loading: false });

    if (code === 200) {
      this.setData({
        video: data
      })
    }
  },

  // 获取关联视频
  async getMovieVideos() {
    this.setData({ movieLoading: true });
    const { code, data } = await getMovieVideos(1197950);
    this.setData({ movieLoading: false });

    if (code === 200) {
      this.setData({
        movie: data.movie,
        videos: data.videos
      })
    }
  },

  // 切换类型
  typeChange(e) {
    this.setData({
      currentTypeEn: e.currentTarget.dataset.type
    })
  },

  // 播放视频
  playHandle({ detail }) {
    this.setData({
      id: detail.id
    })

    this.getVideo()
  }
})
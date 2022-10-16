const app = getApp();

Component({
  behaviors: [wx.computedBehavior],

  properties: {
    videoId: {
      type: Number
    },
    video: {
      type: Object
    }
  },

  computed: {
    isPlay(data) {
      return data.video.id === data.videoId;
    },
    author(data) {
      return data.video.author;
    },
    duration(data) {
      return app.timeFormat(data.video.duration)
    },
    src(data) {
      return data.video.sources[0].url;
    }
  },

  attached() {

  },

  methods: {

    pathToDetail() {
      wx.navigateTo({
        'url': "/pages/video/detail/index?id=" + this.data.video.id
      })
    },

    doPlay() {
      this.triggerEvent('on-play', { id: this.data.video.id })

      this.setData({
        startPlay: true,
        controls: true
      })
    },

    // 播放看點
    ontapPlayId(e) {
      let id = e.currentTarget.dataset.id

      if (!this.data.networkTip) {
        // 网络类型检测
        wx.getNetworkType({
          success: (res) => {
            if (res.networkType == 'wifi') {
              this.playVideo(id)
            } else {
              wx.showModal({
                title: '网络提醒',
                content: '当前不是WIFI网络，请注意流量消耗',
                cancelText: '取消播放',
                confirmText: '继续播放',
                confirmColor: '#f7af0c',
                cancelColor: '#999999',
                success: (res) => {
                  if (res.confirm) {
                    this.setData({
                      networkTip: true
                    })
                    this.playVideo(id)
                  } else if (res.cancel) {
                    return
                  }
                }
              })
            }
          },
          fail: res => {
            this.playVideo(id)
          }
        })
      } else {
        this.playVideo(id)
      }

    },

    // 增加用户播放次数
    addPlayCount(id) {
      app.http('videos/${id}/increment').then(res => { })
    },

    // 播放进度更新
    timeUpdate(e) {
      let currentTime = Math.floor(e.detail.currentTime)
      let progress = Math.floor(currentTime / this.data.duration * 100)

      this.setData({
        progress: (progress <= 100) ? progress : 100
      })
    },
  }
})
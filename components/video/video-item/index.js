const app = getApp()

Component({
  behaviors: [wx.computedBehavior],

  options: {
    addGlobalClass: true,
  },

  properties: {
    playId: {
      type: Number
    },
    video: {
      type: Object,
    },
    // 点击时页面是否跳转
    tapJump: {
      type: Boolean,
      value: true
    }
  },

  computed: {
    // 当前视频是否为本视频
    isCurrent(data) {
      return data.video.id === data.playId;
    },

    duration(data) {
      return app.timeFormat(data.video?.duration)
    },

    created_at(data) {
      return app.dateBefore(data.video?.created_at)
    }
  },

  methods: {
    pathToVideo() {
      // 当前页面为播放页面时不跳转
      if (this.data.isCurrent) return;

      // 点击是否跳转到详情页
      if (!this.data.tapJump) {
        this.triggerEvent('on-play', this.data.video)
      } else {
        wx.navigateTo({
          url: "/pages/video/detail/index?id=" + this.data.video.id
        })
      }
    },
  }
})

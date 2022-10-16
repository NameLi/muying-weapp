const app = getApp()

Component({
  behaviors: [wx.computedBehavior],

  options: {
    multipleSlots: true
  },

  properties: {
    placeholder: {
      type: String,
      value: "",
    },
    poster: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ""
    },
    subtitle: {
      type: String,
      value: ""
    },
    bgcolor: {
      type: String,
      value: ""
    },
    share: {
      type: Boolean,
      value: false,
    },
    startTop: {
      type: Number,
      value: 10,
    },
    endTop: {
      type: Number,
      value: 160,
    },
    scrollTop: {
      type: Number,
      value: 0,
      observer: function (nVal, oVal) {
        if (this.data.headerScrollTopValue <= this.data.endTop + 20) {
          this.data.headerScrollTop = nVal
        }

        this.data.headerScrollTopValue = nVal;

        if (this.data.headerScrollTopValue === 0) {
          this.setData({
            headerScrollTop: 0
          })
        }
      }
    }
  },

  data: {
    isReady: false,
    headerScrollTop: 0,
    headerScrollTopValue: 0,
    statusBarH: app.globalData.statusBarH,
    headerBarH: app.globalData.customBarH,
    headerContentH: app.globalData.customBarH - app.globalData.statusBarH,
    capsuleL: 0,
    capsuleH: 0,
    backgroundStyle: "",
    isHome: false,
  },

  computed: {
    isTop(data) {
      return data.headerScrollTop <= data.statusBarH;
    },
    bgcolorStyle(data) {
      return data.bgcolor ? `background-color: ${data.bgcolor};` : "";
    },
    opacity(data) {
      if (data.headerScrollTop < data.startTop) {
        return `opacity: 0;`;
      };
      // const rate = (data.headerScrollTop - data.startTop) / data.endTop;
      const rate = data.headerScrollTop / data.statusBarH
      const opacity = rate > 1 ? 1 : rate;
      return `opacity: ${opacity};`;
    },
  },

  attached() {
    const customBar = app.globalData.customBar
    const capsuleH = customBar.height
    const capsuleL = customBar.left

    this.setData({
      capsuleH,
      capsuleL,
    })

    // 是否为首页
    this.setData({
      isHome: getCurrentPages().length === 1
    })
  },

  ready() {
    this.setData({
      isReady: true
    })
  },

  methods: {
    goBack() {
      if (this.data.isHome) {
        wx.switchTab({
          url: '/pages/home/index'
        })
      } else {
        wx.navigateBack({
          delta: 1
        })
      }
    },
    showShare() {

    }
  }
})

const app = getApp()

Component({
  behaviors: [wx.computedBehavior],

  options: {
    multipleSlots: true
  },

  properties: {
    title: {
      type: String,
    },
    plain: {
      type: Boolean,
      value: false,
    },
    back: {
      type: Boolean,
      value: true,
    },
    backIcon: {
      type: String,
      value: "back",
    },
    bgcolor: {
      type: String,
    },
    transparent: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    timer: null,
    backing: false,
    el: null,
    statusBarH: app.globalData.statusBarH,
    headerBarH: app.globalData.headerBarH,
  },

  computed: {
    wrapperStyle(data) {
      return data.transparent ? "height: 0" : "height:" + data.headerBarH + 'px';
    },
    style(data) {
      if (data.bgcolor) {
        return `background: ${data.bgcolor};color: #fff`;
      } else if (data.transparent) {
        return `background-color: transparent;color: #fff`;
      } else if (data.plain) {
        return `background: #fff;`;
      }
      return "";
    },
  },

  attached() {
    // 是否为首页
    this.setData({
      isHome: getCurrentPages().length === 1
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
    }
  }
})

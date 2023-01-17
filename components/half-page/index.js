const app = getApp()

Component({

  behaviors: [wx.computedBehavior],

  options: {
    styleIsolation: 'apply-shared',
    multipleSlots: true
  },

  properties: {
    show: {
      type: Boolean,
      value: false
    },
    full: {
      type: Boolean,
      value: false
    },
    customStyle: {
      type: String
    },
    overlay: {
      type: Boolean,
      value: true
    },
    duration: {
      type: Number,
      value: 300
    },
    zIndex: {
      type: Number,
      value: 100
    },
    position: {
      type: String,
      value: 'bottom'
    },
    closeOnSlideDown: {
      type: Boolean,
      value: true
    },
    // 圆角
    round: {
      type: Boolean,
      value: false,
    },
    // 距离顶部高度
    top: {
      type: String,
      value: 0,
    },
    // 标题
    title: {
      type: String,
      value: "",
    },
    height: {
      type: String,
      value: "100vh",
    },
    bgcolor: {
      type: String,
      value: "#fff",
    },

    // 自定义头部
    useSlotHeader: {
      type: Boolean,
      value: false
    },
    // 自定义右侧
    useSlotHeaderRight: {
      type: Boolean,
      value: false
    },
    // 自定义底部
    useSlotFooter: {
      type: Boolean,
      value: false
    },
    // 底部关闭按钮
    footerClose: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    headerBarH: 0,
    backing: false,
    timer: null,
    contentHeight: '100vh',
    statusBarH: app.globalData.statusBarH,
    headerBarH: app.globalData.headerBarH
  },

  computed: {
    _customStyle(data) {
      let { full, height, headerBarH } = data;
      let paddingTop = '';

      if (full) {
        height = '100vh';
        paddingTop = headerBarH + 'px';
      }

      return `padding-top: ${paddingTop};height: ${height};`;
    },
    mainBgcolor(data) {
      return data.bgcolor ? `background-color: ${data.bgcolor}` : "";
    },
  },

  ready() {
    setTimeout(() => {
      this.getContentHeight()
    }, 310)
  },

  methods: {
    // 获取顶部和底部高度，计算内容区域高度
    getContentHeight() {
      let paddingTop = 0;
      if (this.data.full) {
        paddingTop = this.data.headerBarH;
      }

      const query = this.createSelectorQuery()
      query.select('#header').boundingClientRect()
      query.select('#footer').boundingClientRect()
      query.exec((res) => {
        const headerH = res[0].height;
        const footerH = res[1].height;
        const contentH = `calc(${this.data.height} - ${headerH + footerH + paddingTop}px)`

        this.setData({
          contentHeight: contentH
        })
      })
    },

    // 滚动触底
    getMoreData(e) {
      this.triggerEvent('load-more')
    },



    goBack() {
      this.triggerEvent('close', true)
    },
  }
})
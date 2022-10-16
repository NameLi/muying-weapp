Component({
  behaviors: [wx.computedBehavior],

  properties: {
    video: {
      type: Object,
    },
  },

  data: {
    isShowContent: false
  },

  computed: {
    author(data) {
      return data.video.author;
    },
  },

  methods: {
    toggleContent() {
      this.setData({
        isShowContent: !this.data.isShowContent
      })
    },
    showReportModal() {
      this.selectComponent('#reportModal').open(this.data.video.id, "videos");
    }
  }
})

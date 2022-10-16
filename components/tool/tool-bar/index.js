Component({
  options: {
    multipleSlots: true
  },

  properties: {
    useSlotLeft: {
      type: Boolean,
      value: false
    },
    type: {
      required: true,
      type: String,
    },
    data: {
      type: Object,
    },
    commentHeight: {
      type: String,
      value: "88vh"
    }
  },

  data: {
    isShowComment: false
  },

  methods: {
    // 发布评论
    pathToCommentEdit() {
      this.showCommentPage()
    },

    halfPageEnter() {

    },

    halfPageLeave() {
      this.setData({
        isShowComment: false
      })
    },

    // 评论列表
    showCommentPage() {
      this.setData({
        isShowComment: true
      })
    },

    hideCommentPage() {
      this.setData({
        isShowComment: false
      })
    }
  }
})

Component({

  properties: {
    _id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  
  data: {
    isFocus: false,
    content: "",
  },

  methods: {
    showCommentBox() {
      this.setData({
        isFocus: true
      })
    },

    hideCommentBox() {
      this.setData({
        isFocus: false
      })
    },

    contentChange(e) {
      this.setData({
        content: e.detail
      })
    },

    create() {
      this.setData({
        content: ""
      })
      this.triggerEvent("create-success");
    },
  }
})

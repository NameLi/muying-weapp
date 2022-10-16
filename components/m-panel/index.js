Component({
  externalClasses: ['panel-class'],

  options: {
    addGlobalClass: true,
  },

  properties: {
    color: {
      type: String,
      value: "",
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
      value: "",
    },
    replace: {
      type: Boolean,
      value: false,
    },
    to: {
      type: String,
    },
    arrow: {
      type: Boolean,
      value: false
    },
    scrollX: {
      type: Boolean,
      value: true,
    },
  },

  methods: {
    pathTo() {
      if (this.data.to) {
        if (this.data.replace) {
          wx.redirectTo({
            url: this.data.to
          })
        } else {
          wx.navigateTo({
            url: this.data.to
          })
        }
      }
    },
  }
})

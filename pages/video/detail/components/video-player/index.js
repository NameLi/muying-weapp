Component({
  properties: {
    video: {
      type: Object,
      observer(val) {
        if (val.sources) {
          this.setData({
            src: val.sources[0].url
          })
        }
      }
    },
  },

  data: {
    src: "",
    autoplay: false
  },

  methods: {
    doPlay() {
      this.setData({
        autoplay: true
      })
    }
  }
})

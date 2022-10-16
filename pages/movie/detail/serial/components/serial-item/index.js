Component({
  behaviors: [wx.computedBehavior],

  properties: {
    serial: {
      type: Object,
      required: true,
    },
  },

  computed: {
    photos(data) {
      if (data.serial) {
        return data.serial.movies.map((m) => m.poster);
      } else {
        return [];
      }
    },
  },

  methods: {
    pathToSerial() {
      wx.navigateTo({
        url: `/pages/movie/serial/detail/index?id=${this.data.serial.id}`
      })
    }
  }
})

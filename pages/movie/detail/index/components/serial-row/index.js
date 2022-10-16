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
      return data.serial?.movies.map((m) => m.poster);
    },
  },

  methods: {
    pathTo() {
      wx.navigateTo({
        url: "/pages/movie/serial/detail/index?id=" + this.data.serial.id
      })
    },
  }
})

Component({
  properties: {
    swiper: {
      type: Array
    }
  },

  data: {
    swiperIndex: 0
  },

  methods: {
    navigateTo(e) {
      // const data = e.currentTarget.dataset.data;
    },

    swiperChangeHandle(e) {
      const index = e.detail.current
      const bgcolor = this.data.swiper[index].bgcolor

      this.setData({
        swiperIndex: index
      })

      this.triggerEvent('onchange', {
        index,
        bgcolor
      })
    }
  }
})
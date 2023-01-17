import colorToRgba from "../../../../utils/color"

Component({
  properties: {
    swiper: {
      type: Array,
      observer(val) {
        if (val.length) {
          this.swiperChange()
        }
      }
    },
    isTop: {
      type: Boolean,
      value: true
    }
  },

  data: {
    swiperIndex: 0,
    backgroundStyle: ""
  },


  methods: {
    swiperChange(e) {
      const index = e ? e.detail.current : 0;
      const bgcolor = this.data.swiper[index].bgcolor;
      const bgcolorRgba = colorToRgba(bgcolor, 0);

      this.setData({
        swiperIndex: index,
        backgroundStyle: `background-image: linear-gradient(${bgcolor}, ${bgcolorRgba})`
      })
    }
  }
})
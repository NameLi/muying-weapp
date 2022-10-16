Component({
  properties: {

  },
  
  data: {

  },
  
  methods: {
    pathToMovie() {
      wx.switchTab({
        url: '/pages/movie/index/index',
      })
    }
  }
})

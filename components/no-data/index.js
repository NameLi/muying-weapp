Component({
  properties: {
    type: {
      type: String,
    },
    content: {
      type: String,
      value: "",
    },
    height: {
      type: String,
    }
  },

  // ready() {
  //   // try {
  //   setTimeout(() => {
  //     wx.nextTick(() => {

  //       const query = this.createSelectorQuery()
  //       query.select('.no-data-container').boundingClientRect()
  //       query.exec((res) => {
  //         // res[0].top       // #the-id节点的上边界坐标
  //         console.log(res)

  //         this.setData({
  //           height: `calc(100vh - 567px)`
  //         })
  //       })
  //     })

  //     // let top = this.$refs.noData?.parentNode?.getBoundingClientRect().top;
  //     // this.height = 
  //     // this.showContent = true;
  //   }, 300);
  //   // } catch (error) {
  //   //   console.warn(error);
  //   // }
  // }
})

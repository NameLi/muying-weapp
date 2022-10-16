import { getVideos } from "../../api/video"
const app = getApp()

Page({

  behaviors: [wx.getInfiniteData],

  data: {
    videoId: null,
    timer: null,
    startTime: null,
    height: 0,
    tabBarState: true
  },

  loadMore() {
    this.getData(getVideos);
  },

  // 播放视频
  playVideo(e) {
    const videoId = e.detail.id;

    if (videoId === this.data.videoId) return;

    this.setData({
      videoId
    })
  },

  // 页面滚动控制 tabbar
  onPageScroll(e) {
    const scrollY = e.scrollTop // 滚动条距离顶部高度

    if (this.data.videoId) {
      const safeHeight = app.globalData.windowHeight - 60;

      // 滚动超出可视范围(向上滚动与向下滚动)时关闭当前播放
      const query = wx.createSelectorQuery()
      query.select('#video_' + this.data.videoId).boundingClientRect()
      query.exec((res) => {
        if (res[0].top < -60 || res[0].top > safeHeight) {
          this.setData({
            videoId: null
          })
        }
      })
    }

    if (this.data.timer) clearTimeout(this.data.timer)

    let curTime = Date.parse(new Date)

    if (curTime - this.data.startTime >= 500) {
      this._setTabBar(scrollY)
      this.data.startTime = curTime
    } else {

      this.data.timer = setTimeout(() => {
        this._setTabBar(scrollY)
      }, 200)
    }
  },

  // 根据滚动设置 tabbar 显示与隐藏
  _setTabBar(h) {
    if (h >= this.data.height) { // 向上滚动
      if (this.data.tabBarState && wx.hideTabBar) {
        wx.hideTabBar({
          animation: true
        })

        this.data.tabBarState = false
      }
    } else { // 向下滚动
      if (!this.data.tabBarState && wx.showTabBar) {
        wx.showTabBar({
          animation: true
        })
        this.data.tabBarState = true
      }
    }

    this.data.height = h
  },
})
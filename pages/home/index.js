import {
  getIndex
} from '../../api/api';
import {
  SHARE_IMG
} from "../../config.js";

Page({
  data: {
    loading: true,

    isReady: false,

    isTop: true,

    swiper: [],

    article: {
      data: [],
      count: 0
    },

    today: {
      data: [],
      count: 0
    },

    theater: {
      data: [],
      count: 0
    },

    coming: {
      data: [],
      count: 0
    }
  },

  onLoad() {
    wx.hideTabBar() // 隐藏底部导航栏，使加载页面全屏
    this.getIndex() // 首页数据
  },

  onReady() {
    this.setData({
      isReady: true
    })
  },

  // 获取首页信息
  async getIndex() {
    const {
      code,
      data
    } = await getIndex()

    if (code === 200) {
      const {
        swiper,
        article,
        theater,
        coming,
        today
      } = data

      this.setData({
        swiper, // 轮播图
        article, // 文章
        theater, // 正在热映
        coming, // 即将上映
        today, // 那年今日
      }, () => {
        this.setData({
          loading: false
        }, () => {
          wx.showTabBar();
        })
      })
    }
  },

  onPageScroll({
    scrollTop
  }) {
    const threshold = 60; // 滚动变化的阈值

    if (scrollTop > threshold && this.data.isTop) {
      this.setData({
        isTop: false
      })
    } else if (scrollTop <= threshold && !this.data.isTop) {
      this.setData({
        isTop: true
      })
    }
  },

  onShareAppMessage() {
    return {
      title: '慕影网，遇见好电影',
      imageUrl: SHARE_IMG,
      path: '/pages/home/index'
    }
  }
})
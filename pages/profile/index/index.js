import { getUserCollectionCount } from "../../../api/user";

const app = getApp()

Page({
  data: {
    countLoading: false,
    count: {
      actor_count: "-",
      role_count: "-",
      review_count: "-",
      video_count: "-",
    },
    user: null,
    isLogin: false
  },

  onShow() {
    this.getUserInfo()
  },

  getUserInfo() {
    if (app.user) {
      this.setData({
        user: app.user,
        isLogin: true
      })
      this.getUserCollectionCount();
    } else {
      this.setData({
        isLogin: false,
        user: null,
        count: {
          actor_count: "-",
          role_count: "-",
          review_count: "-",
          video_count: "-",
        },
      })
    }
  },


  async getUserCollectionCount() {
    this.data.countLoading = true;
    const { code, data } = await getUserCollectionCount();
    this.data.countLoading = false;

    if (code === 200) {
      this.setData({
        count: data
      })
    }

    wx.stopPullDownRefresh()
  },

  onPullDownRefresh() {
    if (app.isLogin) {
      this.getUserInfo();
    } else {
      wx.stopPullDownRefresh()
    }
  }
})
import { APP_NAME, DEVELOPER, VERSION } from "../../../config";

const app = getApp()

Page({
  behaviors: [wx.computedBehavior],

  data: {
    APP_NAME,
    DEVELOPER,
    VERSION,
  },

  computed: {
    isLogin() {
      return !!app.user;
    },
  },

  logout() {
    app.user = null;
    app.isLogin = false;
    
    try {
      wx.removeStorageSync('token');
      wx.removeStorageSync('user');
      wx.navigateBack();
    } catch (e) {
    }
  },
})
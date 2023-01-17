import { getUserTokenByCode, getUserInfo } from "./api/user"
import { debounce, throttle, dateBefore, timeFormat } from "./utils/index"
import { APP_NAME, HOST } from '/config'
import http from './http/index'
import getInfiniteData from "./mixins/getInfiniteData"

import Toast from 'mind-ui-weapp/toast/toast'
import Message from 'mind-ui-weapp/message/message'
import Modal from 'mind-ui-weapp/modal/modal'


const computedBehavior = require('miniprogram-computed').behavior

// global 
wx.$toast = Toast;  // 

wx.$message = Message;

wx.$modal = Modal;

wx.getInfiniteData = getInfiniteData; // 滚动加载 mixin

wx.computedBehavior = computedBehavior; // 计算属性

const expandPage = () => {
  const originalPage = Page

  Page = function (config) {

    const { onLoad, onReachBottom, onPullDownRefresh } = config;

    config.onLoad = function (options) {
      if (options.id) {
        this.setData({
          id: options.id
        })
      }

      if (typeof onLoad === 'function') {
        onLoad.call(this, options);
      }
    }

    config.onReachBottom = function () {
      if (typeof onReachBottom === 'function') {
        onReachBottom.call(this);
      } else {
        if (typeof this.loadMore === 'function') {
          this.loadMore();
        }
      }
    }

    config.onPullDownRefresh = function () {
      if (typeof onPullDownRefresh === 'function') {
        onPullDownRefresh.call(this);
      } else {
        if (typeof this.resetData === 'function' && typeof this.loadMore === 'function') {
          this.resetData();
        }
      }
    }

    return originalPage(config)
  }
}
expandPage(),


App({
  HOST,
  APP_NAME,

  user: null,
  movie: null,
  actor: null,
  role: null,

  dateBefore,

  debounce,

  throttle,

  // 秒转 00:00 格式
  timeFormat,

  // http 请求封装
  http,

  globalData: {
    isIOS: false,
    customBarH: 70,
    statusBarH: 20,
    customBar: {}
  },

  async onLaunch() {


      wx.login({
        success: async ({ code }) => {
          const params = {
            code,
            type: 'minip'
          }
          const loginRes = await getUserTokenByCode(params);

          if (loginRes.code !== 200) return;

          try {
            wx.setStorageSync('token', loginRes.data.token)
          } catch (e) { }

          const userRes = await getUserInfo();

          // 登录成功
          if (userRes.code === 200) {

            this.user = userRes.data

            wx.setStorage({
              key: "user",
              data: JSON.stringify(userRes.data)
            })
          }
        }
      })

    // 获取设备信息
    wx.getSystemInfo({
      success: e => {
        this.globalData.isIOS = e.system.includes('iOS')
        this.globalData.windowHeight = e.windowHeight;

        const statusBarH = e.statusBarHeight // 状态栏高度 单位 px
        this.globalData.statusBarH = statusBarH

        let capsule = wx.getMenuButtonBoundingClientRect();
        if (capsule) {
          this.globalData.customBar = capsule
          this.globalData.customBarH = capsule.bottom + capsule.top - e.statusBarHeight;
        } else {
          this.globalData.customBarH = e.statusBarHeight + 44;
        }
      }
    })


    const updateManager = wx.getUpdateManager()

    updateManager.onCheckForUpdate(function (res) {

    })

    updateManager.onUpdateReady(function () {
      // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
      updateManager.applyUpdate()
    })

    updateManager.onUpdateFailed(function () {

    })
  }
})
import systemInfo from "./utils/systemInfo"; // 获取导航栏信息方法
import {
  debounce,
  throttle,
  dateBefore,
  timeFormat,
  stringToArrayByKeyword
} from "./utils/index"; // 时间格式化
import getInfiniteData from "./mixins/getInfiniteData";
import pageExtend from "./extend/page";
import Toast from 'mind-ui-weapp/toast/toast';
import Message from 'mind-ui-weapp/message/message';
import Modal from 'mind-ui-weapp/modal/modal';

pageExtend();

wx.$toast = Toast;
wx.$message = Message;
wx.$modal = Modal;

const computedBehavior = require('miniprogram-computed').behavior;
wx.computedBehavior = computedBehavior; // 计算属性

wx.getInfiniteData = getInfiniteData; // 滚动加载 mixin


App({
  token: "", // 默认值为空，当登录或注册成功后，会将后端返回的 token 值写入

  debounce,
  throttle,
  timeFormat,
  dateBefore,
  stringToArrayByKeyword,

  globalData: {},

  onLaunch() {
    // 导航栏信息合并到全局属性下
    this.globalData = Object.assign(this.globalData, systemInfo())
  },
})
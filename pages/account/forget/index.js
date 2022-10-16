import { checkAccount, updateUserPassword } from "../../../api/user";
import { checkPhoneCode } from "../../../api/common";

Page({
  data: {
    loading: false,
    step: 1,
    account: "",
    password: "",
    code: "",
    token: "",

    isShowPassword: false,
    second: 120, // 倒计时
    clock: null, // 倒计时定时器
    codeText: "获取验证码", // 倒计时文字
    sendWaiting: false, // 定时器状态
  },

  onLoad(options) {
    let second = wx.getStorageSync("second");
    if (!isNaN(second) && second > 0) {
      this.setData({
        second: Number(second)
      })

      this.data.clock && clearInterval(this.data.clock);
      this.captchaSuccessHandle();
    }

    const account = wx.getStorageSync("account");
    if (account) {
      this.setData({
        account
      })
    }
  },


  /**
   * @desc 第一步，校验手机号是否存在
   */

  // 账号输入
  accountInput({ detail }) {
    this.setData({
      account: detail.value
    })
  },

  // 清空账号
  clearAccount() {
    this.setData({
      account: ""
    })
  },

  // 手机号校验
  accountValidate() {
    if (this.data.account === "") {
      wx.$toast("请输入手机号");
      return;
    }

    if (!/^1[3456789]\d{9}$/.test(this.data.account)) {
      wx.$toast("手机号码格式不正确");
      return false;
    }

    return true;
  },

  // 校验账号
  async checkAccount() {
    if (!this.accountValidate()) {
      return;
    }

    let params = {
      account: this.data.account,
    };

    this.setData({ loading: true })
    const { code } = await checkAccount(params);
    this.setData({ loading: false })

    if (code === 200) {
      this.setData({
        step: 2
      })
    }
  },

  /**
   * @desc 第二步，手机验证码
   */

  // 显示图片验证码
  showCaptchaModal() {
    if (this.data.sendWaiting) return;
    this.selectComponent('#captchaModal').open();
  },

  // 图片验证码成功
  captchaSuccessHandle() {
    this.setData({
      sendWaiting: true
    })
    this.data.clock = setInterval(this.doLoop, 1000);
  },

  // 倒计时
  doLoop() {
    this.setData({
      second: --this.data.second
    })

    wx.setStorageSync("second", this.data.second);

    if (this.data.second > 0) {
      this.setData({
        codeText: this.data.second + " s"
      })
    } else {
      clearInterval(this.data.clock); //清除js定时器

      this.setData({
        sendWaiting: false,
        codeText: "获取验证码",
        second: 120,  //重置时间
      })
    }
  },

  // 输入验证码
  codeInput({ detail }) {
    this.setData({
      code: detail.value
    })
  },

  // 校验验证码是否正确
  async checkCode() {
    if (this.data.code === "") {
      wx.$toast("请填写手机验证码");
      return;
    }

    let params = {
      phone: this.data.account,
      code: this.data.code,
    };

    this.setData({
      loading: true
    })
    const { code, data } = await checkPhoneCode(params);
    this.setData({
      loading: false
    })

    if (code === 200) {
      this.data.token = data.token;

      this.setData({
        step: 3
      })

      // this.$nextTick(() => {
      //   this.$refs.password.focus();
      // });
    }
  },

  // 密码输入
  passwordInput({ detail }) {
    this.setData({
      password: detail.value
    })
  },

  // 密码
  togglePassword() {
    this.setData({
      isShowPassword: !this.data.isShowPassword,
    })
  },

  // 更新密码
  async updateUserPassword() {
    if (this.data.password === "") {
      wx.$toast("请输入密码");
      return false;
    }

    if (this.data.password.length < 6 || this.data.password.length > 16) {
      wx.$toast("密码长度为6-16位之间");
      return false;
    }

    const reg = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,16}/;

    if (!reg.test(this.data.password)) {
      wx.$toast("密码只能包含数字、字母和特定字符");
      return false;
    }

    let params = {
      password: this.data.password,
    };

    wx.setStorageSync("account", this.data.token);

    this.setData({ loading: true })
    const { code, message } = await updateUserPassword(params)
    this.setData({ loading: false })

    if (code === 200) {
      wx.$toast(message);

      wx.setStorageSync("account", this.data.account);

      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/account/login/index'
        })
      }, 1000);
    }
  }
})
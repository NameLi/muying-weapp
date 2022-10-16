import { register, getUserInfo } from "../../../api/user";

Page({

  behaviors: [wx.computedBehavior],

  data: {
    loading: false,
    form: {
      account: "",
      password: "",
      code: "",
    },
    isShowPassword: false,
    second: 120, // 倒计时
    clock: null, // 倒计时定时器
    codeText: "获取验证码", // 倒计时文字
    sendWaiting: false, // 定时器状态
    code: '', // 小程序code
  },

  computed: {
    isShowClear(data) {
      return data.form.account.length;
    },
  },

  onLoad(options) {
    let second = wx.getStorageSync("second");
    if (!isNaN(second) && second > 0) {
      this.setData({
        second: Number(second)
      })

      this.doLoop();
    }
  },

  // 账号输入
  accountInput({ detail }) {
    this.setData({
      'form.account': detail.value
    })
  },

  // 密码输入
  passwordInput({ detail }) {
    this.setData({
      'form.password': detail.value
    })
  },

  // 验证码输入
  codeInput({ detail }) {
    this.setData({
      'form.code': detail.value
    })
  },

  // 登录
  pathToLogin() {
    wx.redirectTo({
      url: "/pages/account/login/index"
    })
  },

  // 找回密码页
  pathToForget() {
    wx.navigateTo({
      url: "/pages/account/forget/index"
    })
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
        second: 120, //重置时间
      })
    }
  },

  // 清空账号
  clearAccount() {
    this.setData({
      'form.account': ""
    })
  },

  // 切换是否显示密码
  togglePassword() {
    this.setData({
      isShowPassword: !this.data.isShowPassword
    })
  },

  // 显示图片验证码
  getVerifyCode() {
    if (this.data.sendWaiting) return;

    // 校验账号
    if (this.accountValidate()) {
      this.selectComponent('#captchaModal').open();
    }
  },

  // 验证码成功
  captchaSuccessHandle() {
    this.setData({
      sendWaiting: true
    })
    this.data.sendWaiting = true;
    this.data.clock = setInterval(this.doLoop, 1000);
  },

  // 校验账号
  accountValidate() {
    if (this.data.form.account === "") {
      wx.$message.warning("请输入手机号");
      return;
    }

    if (!/^1[3456789]\d{9}$/.test(this.data.form.account)) {
      wx.$message.warning("手机号码格式不正确");
      return false;
    }

    return true;
  },

  // 校验密码
  passwordValidate() {
    if (this.data.form.password === "") {
      wx.$message.warning("请输入密码");
      return false;
    }

    if (this.data.form.password.length < 6 || this.data.form.password.length > 16) {
      wx.$message.warning("密码长度为6-16位之间");
      return false;
    }

    const reg = /([a-zA-Z0-9!@#$%^&*()_?<>{}]){6,16}/;

    if (!reg.test(this.data.form.password)) {
      wx.$message.warning("密码只能包含数字、字母和特定字符");
      return false;
    }

    return true;
  },

  // 
  doRegister() {
    // 校验手机号
    let accountReg = this.accountValidate();
    if (!accountReg) return;

    // 校验密码格式
    let passwordReg = this.passwordValidate();
    if (!passwordReg) return;

    // 校验验证码
    if (this.data.form.code === "") {
      wx.$message.warning("请输入验证码");
      return false;
    }

    if (this.data.form.code.length !== 4) {
      wx.$message.warning("验证码为4位数字");
      return false;
    }

    wx.login({
      success: ({ code }) => {
        this.data.code = code;
      },
      complete: () => {
        this.register();
      }
    })
  },

  // 注册
  async register() {
    // 登录
    try {
      const params = {
        ...this.data.form,
        type: 'minip',
        thrid_code: this.data.code
      }

      this.setData({ loading: true })
      const registerRes = await register(params);

      if (registerRes.code !== 200) {
        this.setData({ loading: false })
        return;
      }

      const userRes = await getUserInfo();
      this.setData({ loading: false })

      // 登录成功
      if (userRes.code === 200) {
        wx.$toast("注册成功");
        wx.redirectTo({
          url: '/pages/home/index'
        })
      }
    } catch (e) {
      this.setData({ loading: false })
    }
  }
})
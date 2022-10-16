import { getUserToken, getUserInfo } from "../../../api/user"

const app = getApp()

Page({

  behaviors: [wx.computedBehavior],

  data: {
    loading: false,
    account: "",
    password: "",
    isShowPassword: false,
  },

  computed: {
    isShowClear(data) {
      return data.account.length;
    },
  },

  onLoad(options) {
    wx.getStorage({
      key: 'account',
      success: ({ data }) => {
        if (data) {
          this.setData({
            account: data
          })
        }
      }
    })
  },

  // 账号注册页
  pathToRegister() {
    wx.redirectTo({
      url: "/pages/account/register/index"
    })
  },

  // 找回密码页
  pathToForget() {
    wx.navigateTo({
      url: "/pages/account/forget/index"
    })
  },

  // 清空账号
  clearAccount() {
    this.setData({
      account: ""
    })
  },

  // 切换是否显示密码
  togglePassword() {
    this.setData({
      isShowPassword: !this.data.isShowPassword
    })
  },

  // 登录
  doLogin() {
    if (this.data.account === "") {
      wx.$message.warning("请输入手机号");
      return;
    }

    if (this.data.password === "") {
      wx.$message.warning("请输入密码");
      return;
    }

    wx.login({
      success: ({ code }) => {
        this.data.code = code;
      },
      complete: () => {
        this.getUserToken();
      }
    })
  },


  async getUserToken() {
    try {
      this.setData({ loading: true })

      const { account, password } = this.data;

      let params = {
        account,
        password,
        type: 'minip',
        code: this.data.code
      }

      const loginRes = await getUserToken(params);

      if (loginRes.code !== 200) {
        this.setData({ loading: false })
        wx.$toast(loginRes.message);
        return;
      }

      try {
        wx.setStorageSync('token', loginRes.data.token)
      } catch (e) { }

      const userRes = await getUserInfo();

      this.setData({ loading: false })

      // 登录成功
      if (userRes.code === 200) {

        app.user = userRes.data

        wx.$toast("登录成功");

        wx.setStorage({
          key: "user",
          data: JSON.stringify(userRes.data)
        })

        wx.navigateBack()
        // wx.switchTab({
        //   url: '/pages/home/index',
        // })
      }
    } catch (e) {
      this.setData({ loading: false })
    }
  }
})
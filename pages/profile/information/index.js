import { updateUserInfo, uploadImage } from "../../../api/user";

const app = getApp()

Page({
  data: {
    isShowUsername: false,
    isShowGender: false,
    submitLoading: false,
    isFocus: false,
    user: {
      username: "",
      avatar: "",
      birthday: "",
      gender: ""
    },
    genders: [
      {
        loading: false,
        name: "保密",
      },
      {
        loading: false,
        name: "男",
      },
      {
        loading: false,
        name: "女",
      },
    ],
  },

  onLoad() {
    this.setData({
      user: app.user
    })

    this.setData({
      birthday: this.data.user.birthday
    })
  },

  // 封面图片变更
  async onChooseAvatar(e) {
    const imageUrl = e.detail.avatarUrl;

    this.setData({ avatarLoading: true })
    const { code, data, message } = await uploadImage(imageUrl, 'avatar', { type: 'avatar' })
    this.setData({ avatarLoading: false })


    if (code === 200) {
      this.setData({
        'user.avatar': data
      })

      this.updateUserInfo();
    } else {
      wx.$toast(message)
    }
  },

  inputFocus(e) {
    this.setData({
      isFocus: true
    })
  },

  inputBlur(e) {
    this.setData({
      isFocus: false
    })
  },

  // 昵称
  showUsername() {
    this.setData({
      username: this.data.user.username,
      isShowUsername: true
    })
  },

  usernameChange(e) {
    this.setData({
      username: e.detail.value
    })
  },

  // 保存用户名
  usernameModalConfirm() {
    if (this.data.username.length === 0) {
      wx.$message.warning("请输入用户名");
      return;
    }
    if (this.data.username.length > 10) {
      wx.$message.warning("用户名不能超过10个字符");
      return;
    }

    this.data.user.username = this.data.username;

    this.updateUserInfo('username');
  },

  // 
  hideUsernameModal() {
    this.setData({
      isShowUsername: false
    })
  },

  // 性别
  showGenderModal() {
    this.setData({
      isShowGender: true
    })
  },

  hideGenderModal() {
    this.setData({
      isShowGender: false
    })
  },

  handleClickItem(e) {
    if (this.data.genders.some(g => g.loading)) return;

    const index = e.detail.index;

    this.data.genders[index].loading = true;

    this.setData({
      genders: this.data.genders
    })

    this.data.user.gender = this.data.genders[index].name;

    this.updateUserInfo('gender');
  },


  // 生日
  birthdayChange(e) {
    this.setData({
      birthday: e.detail.value
    })

    this.data.user.birthday = this.data.birthday;

    this.updateUserInfo('birthday');
  },

  // 更新用户信息
  async updateUserInfo(type) {
    let params = {
      ...this.data.user,
    };

    this.setData({
      submitLoading: true
    })

    const { code, data } = await updateUserInfo(params);

    this.setData({
      submitLoading: false
    })

    if (code === 200) {
      app.user = data;

      wx.setStorage({
        key: "user",
        data: JSON.stringify(data)
      })

      wx.$toast("更新成功");

      this.setData({
        user: app.user,
        isShowUsername: false,
        isShowGender: false
      })
    }

    switch (type) {
      // 性别
      case 'gender':
        const genders = this.data.genders.map(g => {
          return {
            ...g,
            loading: false
          }
        })

        this.setData({
          genders
        })
        break;

      // 生日
      case 'birthday':
        this.setData({
          birthday: this.data.user.birthday
        })
        break;
    }

  },
})
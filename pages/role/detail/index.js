import { getRole } from "../../../api/role";
import { createCollection, deleteCollection } from "../../../api/user";
const app = getApp();

Page({
  behaviors: [wx.computedBehavior],

  data: {
    id: null,
    loading: false,
    isHalf: true,
    focusLoading: false,
    scrollTop: 0,
    curScrollTop: 0,
    role: {
      avatar: "",
      photos: [],
      movies: [],
      actors: [],
      movie_count: 0,
      photo_count: 0,
      actor_count: 0,
      info: "",
    },
    isShowFullAvatar: false,
    isShowInformation: false
  },

  computed: {
    isDefaultPoster(data) {
      return data.role.avatar.includes("default");
    },
    bgImage(data) {
      return `background-image:url('${data.role.avatar}')`;
    },
    bgImageLarger(data) {
      return `background-image:url('${data.role.avatar?.replace(
        /public/,
        "larger"
      )}')`;
    },
    isShowHalfPage(data) {
      return data.isShowInformation;
    }
  },

  onLoad(options) {
    this.data.id = Number(options.id);

    if (app.role?.id === this.data.id) {
      this.setData({
        role: Object.assign(this.data.role, app.role)
      })
    }

    this.getRole();
  },

  showFullAvatar() {
    this.setData({
      isShowFullAvatar: !this.data.isShowFullAvatar
    })
  },

  // 获取角色信息
  async getRole() {
    this.setData({ loading: true });
    const { code, data } = await getRole(this.data.id);
    this.setData({ loading: false });

    if (code === 200) {
      //
      let infos = [];
      for (let item of data.defaults) {
        if (["外文名", "性别", "生日"].includes(item.label) && item.value) {
          infos.push(item.value);
        }
      }

      data.info = infos.join(" · ");

      this.setData({
        role: Object.assign(this.data.role, data)
      })

      // 默认头像是不获取头像大小
      if (!this.data.role.avatar.includes('default')) {
        this.getAvatarInfo(this.data.role.avatar)
      }
    }
  },

  getAvatarInfo(url) {
    wx.getImageInfo({
      src: url,
      success: (res) => {
        const { width, height } = res
        const maxHeight = Math.floor(height * 750 / width)

        this.setData({
          maxHeight: maxHeight + 'rpx'
        })
      }
    })
  },

  // 收藏
  async focusRole() {
    if (this.data.focusLoading) return;

    this.setData({ focusLoading: true });
    const { code, data, message } = !this.data.role.is_collection ?
      await createCollection("roles", this.data.id) :
      await deleteCollection("roles", this.data.id);
    this.setData({ focusLoading: false });

    if (code === 200) {
      this.setData({
        'role.is_collection': data.is_collection,
        'role.collection_count': data.collection_count,
      })

      wx.$message.success(message);
    }
  },

  halfPageLeave() {
    this.hideInformationPage();
  },

  // 显示详情
  showInformationPage() {
    // 记录当前页面滚动高度
    this.data.curScrollTop = parseInt(this.data.scrollTop);

    // 为了触发header的observer
    this.setData({
      scrollTop: 200
    })

    this.setData({
      scrollTop: 201,
      isShowInformation: true
    })
  },

  hideInformationPage() {
    this.setData({
      isShowInformation: false,
      scrollTop: this.data.curScrollTop,
    })

    // 为了触发header的observer
    this.setData({
      scrollTop: this.data.curScrollTop + 0.1,
    })
  },

  onPageScroll({ scrollTop }) {
    // page-container 弹出时，会触发 scrollTop = 0，影响关闭时的header展示，
    // 也会导致闪屏，在此做拦截不设置为0
    if(this.data.isShowInformation) return;
    
    this.setData({
      scrollTop
    })
  },
})
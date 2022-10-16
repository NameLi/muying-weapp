import { getActor } from "../../../api/actor";
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
    actor: {
      avatar: "",
      photo_count: 0,
      works_count: 0,
      role_count: 0,
      award: {},
      photos: [],
      works: [],
    },
    maxHeight: '460rpx',
    isShowInformation: false,
    isShowFullAvatar: false,
    curScrollTop: 0,  // 当前页面滚动高度，显示详情时使用
  },

  computed: {
    isDefaultPoster(data) {
      return data.actor.avatar.includes("default");
    },
    bgImage(data) {
      return `background-image:url('${data.actor.avatar}')`;
    },
    bgImageLarger(data) {
      return `background-image:url('${data.actor.avatar?.replace(
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

    if (app.actor?.id === this.data.id) {
      this.setData({
        actor: Object.assign(this.data.actor, app.actor)
      })
    }
    this.getActor();
  },

  // 切换全图
  showFullAvatar() {
    this.setData({
      isShowFullAvatar: !this.data.isShowFullAvatar
    })
  },

  // 获取影人信息
  async getActor() {
    this.setData({ loading: true });
    const { code, data } = await getActor(this.data.id);
    this.setData({ loading: false });

    if (code === 200) {
      this.setData({
        actor: Object.assign(this.data.actor, data)
      })

      // 默认头像是不获取头像大小
      if (!this.data.actor.avatar.includes('default')) {
        this.getAvatarInfo(this.data.actor.avatar)
      }
    }
  },

  // 获取影人封面图片长宽，用于点击查看大图
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

  // 关注
  async focusActor() {
    if (this.data.focusLoading) return;

    this.setData({ focusLoading: true });
    const { code, data, message } = !this.data.actor.is_collection ?
      await createCollection("actors", this.data.id) :
      await deleteCollection("actors", this.data.id);
    this.setData({ focusLoading: false });

    if (code === 200) {
      this.setData({
        'actor.is_collection': data.is_collection,
        'actor.collection_count': data.collection_count
      })
      wx.$message.success(message);
    }
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
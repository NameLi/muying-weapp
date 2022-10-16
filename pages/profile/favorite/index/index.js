import { getUserFavorites } from "../../../../api/user";

Page({
  data: {
    loading: false,
    list: [],
    total: 0,
    isShowCreate: false
  },

  onShow() {
    this.getUserFavorites();
  },

  // 显示创建modal
  showCreatePage() {
    if (this.data.loading) return;

    this.setData({
      isShowCreate: true
    })
  },

  // 关闭创建modal
  hideCreatePage() {
    this.setData({
      isShowCreate: false
    })
  },

  // 创建成功
  createSuccess() {
    this.getUserFavorites();
    this.hideCreatePage();
  },

  // 查看详情
  pathToDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/profile/favorite/detail/index?id=${id}`
    })
  },

  // 获取收藏夹列表
  async getUserFavorites() {
    this.setData({ loading: true });
    const { code, data, total } = await getUserFavorites();
    this.setData({ loading: false });

    wx.stopPullDownRefresh();

    if (code === 200) {
      this.setData({
        list: data,
        total
      })
    }
  },

  onPullDownRefresh() {
    this.getUserFavorites();
  }
})
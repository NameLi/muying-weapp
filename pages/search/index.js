const app = getApp()

Page({
  data: {
    keyword: "", //	搜索关键字
    histories: [],
  },

  onLoad() {
    this.getHistories();
  },

  getHistories() {
    const histories = wx.getStorageSync('histories');

    if (histories) {
      try {
        this.setData({
          histories: JSON.parse(histories)
        })
      } catch (e) {

      }
    } else {
      this.setData({
        histories: []
      })
    }
  },

  // 选择历史记录中的关键字
  keywordChange(e) {
    this.setData({
      keyword: e.detail
    })
  },

  // 清空历史记录
  clearHistories() {
    try {
      wx.removeStorageSync('histories')
      this.setData({
        histories: []
      })

      // 关闭清空弹窗
      this.selectComponent("#modal").onClose();
    } catch (e) { }
  },

  // 清空搜索内容
  clearKeyword() {
    this.setData({
      keyword: ""
    })
  },

  // 搜索关键字存储
  storageKeyword(e) {
    const keyword = e.detail
    if (!keyword) return;

    this.getHistories();

    let histories = this.data.histories

    if (!histories.includes(keyword)) {

      // 历史记录大于20则
      if (histories.length > 20) {
        histories.pop();
        this.setData({
          histories
        })
      }

      histories.unshift(keyword);

      this.setData({
        histories
      })

      try {
        wx.setStorageSync('histories', JSON.stringify(histories))
      } catch (e) { }
    }
  },

  onReachBottom() {
    this.selectComponent('#searchResult').search();
  }
})
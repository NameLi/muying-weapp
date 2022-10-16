Page({
  copyText(e) {
    const text = e.currentTarget.dataset.text

    wx.setClipboardData({
      data: text,
      success(res) {

      }
    })
  },
})
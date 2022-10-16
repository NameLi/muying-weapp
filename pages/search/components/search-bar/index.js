Component({
  properties: {
    value: String,
  },

  methods: {
    keywordChange(e) {
      const value = e.detail.value
      this.triggerEvent("keyword-change", value);
    },

    doSearch(e) {
      const value = e.detail.value
      this.triggerEvent("keyword-change", value);
    },

    clearValue() {
      this.triggerEvent("on-clear");
    },

    checkedHandle(keyword) {
      this.triggerEvent("keyword-change", keyword);
    },

    noop() { },

    // 取消
    cancel() {
      wx.navigateBack();
    }
  }
})
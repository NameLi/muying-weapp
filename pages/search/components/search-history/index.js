Component({
  properties: {
    histories: {
      type: Array,
    },
  },

  methods: {
    keywordChecked(e) {
      this.triggerEvent('on-keyword', e.currentTarget.dataset.keyword)
    },

    clearHistories() {
      wx.$modal({
        title: "提示",
        content: "确定要清空历史记录吗?",
        asyncClose: true,
      })
        .then(() => {
          this.triggerEvent("on-clear");
        })
        .catch(() => {
        });
    },
  }
})
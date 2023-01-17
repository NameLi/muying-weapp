const app = getApp();

Component({
  behaviors: [wx.computedBehavior],

  options: {
    addGlobalClass: true,
  },

  properties: {
    isHalf: {
      type: Boolean,
    },
  },

  data: {
    headerBarH: app.globalData.headerBarH
  },

  computed: {
    style(data) {
      return data.isHalf ? `margin-top: ${data.headerBarH}px` : `padding-top: ${data.headerBarH}px`;
    },
  },
})
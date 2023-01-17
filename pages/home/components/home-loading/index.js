const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    headerBarH: app.globalData.headerBarH,
    statusBarH: app.globalData.statusBarH,
    titleBarH: app.globalData.titleBarH,
    searchBarH: app.globalData.capsuleH,
    capsuleW: app.globalData.capsuleW,
  }
})
const app = getApp()

Component({
  options: {
    addGlobalClass: true,
  },

  data: {
    statusBarH: app.globalData.statusBarH,
    headerBarH: app.globalData.customBarH - app.globalData.statusBarH,
    searchBarH: app.globalData.customBar.height,
    headerStyle: ""
  },

  attached() {
    const statusBarH = app.globalData.statusBarH;
    const customBar = app.globalData.customBar;

    const headerStyles = {
      'padding-top': customBar.top - statusBarH + 'px',
      'padding-right': customBar.width + 20 + 'px',
    }

    let headerStyle = ""
    for (let [key, val] of Object.entries(headerStyles)) {
      headerStyle += `${key}: ${val};`
    }

    this.setData({
      headerStyle
    })
  },
})

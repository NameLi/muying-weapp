const app = getApp()

function colorToRgba(color, alpha) {
  // 16进制颜色值的正则
  let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

  // 把颜色值变成小写
  color = color.toLowerCase();

  if (reg.test(color)) {
    // 如果只有三位的值，需变成六位，如：#fff => #ffffff

    if (color.length === 4) {
      let colorNew = "#";
      for (let i = 1; i < 4; i += 1) {
        colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
      }
      color = colorNew;
    }

    // 处理六位的颜色值，转为RGB
    let colorChange = [];
    for (let i = 1; i < 7; i += 2) {
      colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
    }
    return `RGB(${colorChange.join(",")}, ${alpha})`;
  } else {
    return color;
  }
}

Component({
  properties: {
    bgcolor: {
      type: String,
    },
    scrollTop: {
      type: Number
    }
  },

  data: {
    isTop: false,
    statusBarH: app.globalData.statusBarH,
    headerBarH: app.globalData.customBarH,
    searchBarH: app.globalData.customBar.height,
    headerStyle: "",
    backgroundStyle: "",
  },

  observers: {
    bgcolor(val) {
      const bgcolorRgba = colorToRgba(val, 0);
      this.setData({
        backgroundStyle: `background-image: linear-gradient(${val}, ${bgcolorRgba})`
      });
    },
    scrollTop(val) {
      this.setData({
        isTop: val <= 10
      })
    }
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

  methods: {
    pathToSearch() {
      wx.navigateTo({
        url: '/pages/search/index',
      })
    }
  }
})
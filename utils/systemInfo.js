/**
 * @desc 获取导航栏信息对象
 * @return {object} 导航栏信息对象
 */

export default () => {
  const windowInfo = wx.getWindowInfo();
  const capsule = wx.getMenuButtonBoundingClientRect(); // 胶囊尺寸
  
  const statusBarH = windowInfo.statusBarHeight; // 状态栏高度
  const titleBarH = capsule.top + capsule.bottom - statusBarH * 2; // 标题栏高度
  const headerBarH = statusBarH + titleBarH; // 导航栏高度
  const capsuleH = capsule.height; // 胶囊高度，用于搜索框
  const capsuleW = capsule.width; // 胶囊宽度，用于搜索框

  return {
    headerBarH,
    statusBarH,
    titleBarH,
    capsuleH,
    capsuleW,
    capsule
  }
}
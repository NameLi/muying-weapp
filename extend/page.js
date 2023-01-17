export default () => {

  const originalPage = Page; // 将 Page 原函数赋值给其它变量存储

  /**
   * @desc Page 扩展，增加一些方法
   * @param { object } config Page 页面配置项
   * @return { function } 扩展后的 Page 函数
   */
  Page = function (config) {
    // config 是页面默认的方法，我们从中取出需要扩展的方法命名
    const {
      onLoad,
      onReachBottom,
      onPullDownRefresh
    } = config;

    // onLoad 生命周期
    config.onLoad = function (options) {
      // 如果路由url传值中存在 id，则将其 setData 到 data 上
      // 如果页面中也有此判断条件，将会被覆盖
      if (options && options.id) {
        this.setData({
          id: options.id
        })
      }

      // 如果页面中存在 onLoad 方法，则将路由的参数指向改为 onLoad 对象
      if (typeof onLoad === 'function') {
        onLoad.call(this, options);
      }
    }

    // 下拉刷新事件扩展
    config.onPullDownRefresh = function () {
      // 如果页面中存在 onPullDownRefresh 方法
      // 则使用页面中的，也就是页面中的方法会覆盖此处定义的扩展
      if (typeof onPullDownRefresh === 'function') {
        onPullDownRefresh.call(this);
      } else {
        // 如果页面中存在 resetData 与 loadMore 方法
        // 则调用 resetData 方法，将 data 数据重置
        if (typeof this.resetData === 'function' && typeof this.loadMore === 'function') {
          this.resetData();
        }
      }
    }

    // 下拉刷新事件扩展
    config.onReachBottom = function () {
      // 如果页面中存在 onReachBottom 方法
      // 则使用页面中的，也就是页面中的方法会覆盖此处定义的扩展
      if (typeof onReachBottom === 'function') {
        onReachBottom.call(this);
      } else {
        // 如果页面中存在 loadMore 方法
        // 则调用该方法加载列表数据
        if (typeof this.loadMore === 'function') {
          this.loadMore();
        }
      }
    }

    // 将扩展后的方法返回,我们将在 app.js 中进行调用将其设置到全局中
    return originalPage(config)
  }
}
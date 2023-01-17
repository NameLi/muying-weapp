/**
 * @desc 防抖函数
 * @param {function} func 目标函数
 * @param {number} [wait=100] 延迟执行毫秒数
 * @return {function} 
 */
export const debounce = (func, wait = 100) => {
  let timeout;
  return function (event) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.call(this, event);
    }, wait);
  };
}

/**
 * @desc 节流函数
 * @param {function} func 目标函数
 * @param {number} [wait=1000/60] 延迟执行毫秒数
 * @return {function} 
 */
export const throttle = (func, wait = 1000 / 60) => {
  let last = 0;
  return function () {
    var now = new Date().getTime();;
    if (now - last > wait) {
      func.call(this, ...arguments);
      last = new Date().getTime();
    }
  }
}

/**
 * @desc 格式化时间 将秒数转为 00:00 格式
 * @param {number} [sec = 0] 需要转换的秒数
 * @return {string} 00:00 格式时间
 */
export const timeFormat = (sec = 0) => {
  let min = 0;
  min = Math.floor(sec / 60); //  分
  min < 10 && (min = '0' + min); //  补零
  sec = Math.floor(sec % 60); //  秒
  sec < 10 && (sec = '0' + sec); //  补零

  return (min || '00') + ":" + sec;
}

/**
 * @desc 将日期格式转为多久前
 * @param {date} datatime Y-m-d H:i:s 格式时间
 * @return {string} 多久前
 */
export const dateBefore = (datatime) => {
  let dateTimeStamp = new Date(datatime).getTime()

  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;

  let month = day * 30;
  let year = month * 12;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  let result = ""

  if (diffValue < 0) {
    return;
  }

  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let yearC = diffValue / year;

  if (yearC >= 1) {
    return "" + parseInt(yearC) + "年前";
  }
  if (monthC >= 1) {
    result = "" + parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
    result = "" + parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
    result = "" + parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
    result = "" + parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
    result = "" + parseInt(minC) + "分钟前";
  } else {
    result = "刚刚";
  }

  return result;
}


/**
 * @desc 将字符串按照关键字拆分为数组
 * @param {string} text 需要拆分的字符串 
 * @param {string} keyword 进行拆分的关键字 
 * @return {string} 按关键字拆分后的数组
 */
export const stringToArrayByKeyword = (text, keyword) => {
  return text.toString().replace(new RegExp(`${keyword}`, 'g'), `%%${keyword}%%`).split('%%')
}
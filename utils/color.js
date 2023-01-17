/**
 * @desc 16进制颜色值转换为RGBA，支持大小写与缩写
 * @param {string} color 16进制颜色值
 * @param {float} [alpha = 1] 透明度
 * @return {string} 如果为16进制颜色值则转为 rgba，否则返回原值
 */
export default (color, alpha = 1) => {
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
    return `RGBA(${colorChange.join(",")}, ${alpha})`;
  } else {
    return color;
  }
}
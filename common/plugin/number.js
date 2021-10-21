'use strict';
/**
 * 返回几位随机数
 *
 * @param {Number} n
 *
 * @returns {String}
 */
function randomOfDigit(n) {
  return Math.random().toString().slice(-n);
}

/**
 * 生成4位16进制数字
 *
 * @returns {String}
 */
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

/**
 * 生成唯一guid
 *
 * @returns {String}
 */
function guid() {
  return (
    S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
  );
}

module.exports = {
  randomOfDigit,
  S4,
  guid
};

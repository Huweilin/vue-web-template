/* eslint-disable no-prototype-builtins */

import Vue from 'vue'

// 深拷贝方法
function deepCopy (obj) {
  //判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepCopy(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}
// 确认弹窗
function confirm (content, title = '提示', ops = { type: 'warning', cancelTex: '取消', confirmText: '确定' }) {
  return new Promise(function (resolve) {
    Vue.prototype.$confirm(content, title, {
      confirmButtonText: ops.confirmText || '确定',
      cancelButtonText: ops.cancelTex || '取消',
      type: ops.type || 'warning'
    }).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}
// 消息提示
function message (title, type = 'success', options = {}) {
  Vue.prototype.$message({ message: title, type, ...options })
}
export default {
  deepCopy,
  confirm,
  message
}

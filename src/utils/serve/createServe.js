import axios from 'axios'
import Vue from 'vue'
const qs = require('qs')

let canShowMsg = true
let cancelText = '手动取消'
// 添加请求拦截器
axios.interceptors.response.use(
  function (response) {
    const res = response.data
    // const res = response
    // 文件流
    if (response.headers['content-type'] == "application/file" || res.code === undefined) {
      return res
		}
    // json
    if (res.code != 200) { // 非正常返回
      Vue.prototype.$message({ type: 'error', message: res.message })
      return Promise.reject(new Error(res.message || '异常返回'))
    } else {
      return res
    }
  },
  function (error) {
    let isNotCancel = !error || error.message !== cancelText
    if (canShowMsg && isNotCancel) {
      canShowMsg = false
      Vue.prototype.$message({ type: 'error', message: (error && error.message != 'Network Error') ? error.message : '服务器响应失败' })
      setTimeout(() => {
        canShowMsg = true
      }, 3000)
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

class BaseService {

  static get (url, params, options) {
    let config = {}
    if (params) {
      url += '?' + qs.stringify(params)
    }
    if (options) {
      config = Object.assign(config, options)
    }
    return axios.get(url, config).then(response => {
      return response
    })
  }

  static post (url, data, config) {
    if (config && config['params']) {
      url += '?' + qs.stringify(config['params'])
      delete config['params']
    }
    return axios.post(url, data, config).then(response => {
      return response
    })
  }

  static put (url, data, options) {
    let config = options || {}
    return axios.put(url, data, config).then(response => {
      return response
    })
  }

  static patch (url, data) {
    return axios.patch(url, data).then(response => {
      return response
    })
  }

  static del (url, params, options) {
    let config = options || {}
    if (params) {
      url += '?' + qs.stringify(params)
    }
    return axios.delete(url, config).then(response => {
      return response
    })
  }

  static downLoadFile (fileName, options) {
    options.method = options.method || 'get'
    options.responseType = 'blob'
    if (options.params) {
      options.url += '?' + qs.stringify(options.params)
      delete options.params
    }
    return axios(options).then(response => {
      const blob = new Blob([response], {
        type: response['type']
      })
      let a = document.createElement('a')
      a.target = '_blank'
      a.href = URL.createObjectURL(blob)
      a.download = fileName
      a.click()
      URL.revokeObjectURL(a.href)
      return { code: 200, message: '下载成功' }
    })
  }

  static uploadFiles (url, obj, options) {
    // files [{ name: 名称, value: 文件或值 }]
    if (!obj) {
      return false
    }
    let data = new FormData()
    for (let key in obj) {
      data.set(key, obj[key])
    }
    options = Object.assign({
      headers: { 'content-type': 'multipart/form-data' }
    }, options || {})
    return axios.post(url, data, options)
  }
}

export default BaseService

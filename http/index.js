import { HOST } from '../config'

export default {
  get(url, data) {
    return request(url, data)
  },

  post(url, data) {
    return request(url, data, 'POST')
  },

  put(url, data) {
    return request(url, data, 'PUT')
  },

  delete(url, data) {
    return request(url, data, 'DELETE')
  },

  upload(url, filePath, name, formData) {
    return upload(url, filePath, name, formData)
  }
}


function upload(url, filePath, name = 'file', formData = {}) {

  return new Promise((resolve, reject) => {
    const token = wx.getStorageSync('token');

    wx.uploadFile({
      url: HOST + url,
      filePath,
      name,
      formData,
      header: {
        Authorization: 'Bearer ' + token
      },
      success(res) {
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data)
        }
        resolve(res.data)
      }
    })
  })
}


function request(url, data = {}, method = 'GET') {
  let header = {}

  try {
    let token = wx.getStorageSync('token')

    if (token) {
      header = {
        Authorization: 'Bearer ' + token
      }
    }
  } catch (e) {

  }

  return new Promise((resolve, reject) => {
    wx.request({
      url: HOST + url,
      data,
      method,
      header,
      success: res => {

        if (res.statusCode === 401) {
          setTimeout(() => {
            wx.navigateTo({
              url: "/pages/account/login/index"
            })
          }, 0)
        }

        if (res.statusCode === 200) {

          if (res.data.code >= 400) {
            wx.showToast({
              title: String(res.data.message || 'system error'),
              icon: 'none',
              duration: 2000
            })
          }

          resolve(res.data)
        }

        resolve({
          code: res.statusCode,
          message: res.data.message,
          data: {}
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  })
}
/**
 * Created by joey on 2018/2/19
 */
import { create } from 'axios'
import _ from 'lodash'
import helper from './helper'

/**
 * 解决IE报warning Unhandled Rejections Error 参数书不正确的问题
 * @private
 */
Promise._unhandledRejectionFn = _.noop

const Singleton = (function () {
  let instantiated
  const baseURL = ENV.apiDomain
  
  function init () {
    
    return create({
      baseURL,
      
      withCredentials: true,
      
      /**
       * 表示服务器将响应的数据类型
       * 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
       */
      responseType: 'json',
      
      headers: {
        //'X-Requested-With': 'XMLHttpRequest',
      },
    })
  }
  
  return {
    getInstance () {
      return instantiated ? instantiated : instantiated = init()
    },
  }
})()

/**
 * 请求中转函数
 * @param {Object} options
 * @return {Promise}
 * @private
 */
const _request = (options = {}) => {
  
  return new Promise((resolve, reject) => {
    Singleton.getInstance().request(options).then(info => {
      const {data, code, msg} = info.data
      
      if (ENV.apiSuccessCode === code) {
        resolve({code, data, msg})
      } else {
        reject({code, data, msg})
      }
    }).catch(info => reject({code: info.code, data: info.data, msg: info.message}))
  })
}

/**
 * get请求
 * @param {String} url
 * @param {Object} params
 * @param {Object} options
 * @returns {Promise}
 */
export function get (url, params = {}, options = {}) {
  return _request(_.merge({
    url,
    method: 'get',
    params,
  }, options))
}

/**
 * post请求
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function post (url, data = {}, options = {}) {
  return _request(_.merge({
    url,
    method: 'post',
    data: _.transform(data, (result, value, key) => result.append(key, value),
      new URLSearchParams()),
    
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  }, options))
}

/**
 * post json请求
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function postJSON (url, data = {}, options = {}) {
  return _request(_.merge({
    url,
    method: 'post',
    data,
    headers: {'Content-Type': 'application/json'},
  }, options))
}

/**
 * 请求上传文件
 * @param {String} url
 * @param {Object} data
 * @param {Function} onUploadProgress
 * @param {Object} options
 * @returns {Promise}
 */
export function upload (url, data = {}, options = {}, onUploadProgress = _.noop) {
  return _request(_.merge({
    url,
    method: 'post',
    data: data instanceof FormData
      ? data
      : helper.objectToFormData(data),
    onUploadProgress,
    headers: {'Content-Type': 'multipart/form-data'},
  }, options))
}

/**
 * restful delete
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function del (url, data = {}, options = {}) {
  return _request(_.merge({
    url,
    method: 'delete',
    data,
    headers: {'Content-Type': 'application/json'},
  }, options))
}

/**
 * restful put
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function put (url, data = {}, options = {}) {
  
  return _request(_.merge({
    url,
    method: 'put',
    data,
    headers: {'Content-Type': 'application/json'},
  }, options))
}

/**
 * 并发执行多个请求
 * @returns {Promise.<*>}
 */
export function all (args) {
  return Array.isArray(args) ? Promise.all(args) : Promise.all([...arguments])
}

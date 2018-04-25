/**
 * Created by joey on 2018/2/19
 */
import { create } from 'axios'
import ENV from 'ENV'
import _ from 'lodash'

/**
 * 解决IE报warning Unhandled Rejections Error 参数书不正确的问题
 * @private
 */
Promise._unhandledRejectionFn = _.noop

/**
 * axios单体
 * @type {{getInstance: Function}}
 */
const Singleton = (function () {
  let instantiated
  const baseURL = ENV.mock.isStart ? ENV.mock.apiDomain : ENV.apiDomain
  
  function init () {
    
    return create({
      /**
       * uri基准值
       */
      baseURL,
      
      /**
       * 指示是否跨站点访问控制请求
       */
      withCredentials: true,
      
      /**
       * 表示服务器将响应的数据类型
       * 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
       */
      responseType: 'json',
      
      /**
       *  是要发送的自定义 headers
       */
      headers: {
        //'X-Requested-With': 'XMLHttpRequest'
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
 * @param options
 * @return {Promise}
 * @private
 */
const _request = (options = {}) => {
  
  return new Promise((resolve, reject) => {
    /**
     * 请求
     */
    Singleton.getInstance().request(options).then(info => {
      /**
       * 获取请求后的数据
       * code，msg，data格式是预先规定好的
       */
      const {data, code, msg} = info.data
      
      /**
       * code和枚举的apiSuccessCode一致---resolve
       */
      if (ENV.apiSuccessCode === code) {
        resolve({code, data, msg})
      } else {
        reject({code, data, msg})
      }
      
      /**
       * 错误的处理
       */
    }).catch(info => {
      reject({
        code: info.code,
        data: info.data,
        msg: info.message,
      })
    })
  })
}

/**
 * get请求
 * @param {string} url
 * @param {object} params
 * @param {object} options
 * @returns {Promise}
 */
export function get (url, params = {}, options = {}) {
  options = _.assign({
    url,
    method: 'get',
    params,
  }, options)
  
  return _request(options)
}

/**
 * post请求
 * @param {string} url
 * @param {object} data
 * @param {object} options
 * @returns {Promise}
 */
export function post (url, data = {}, options = {}) {
  options = _.assign({
    url,
    method: 'post',
    data: (function () {
      const requestParams = new URLSearchParams()
      _.each(data, (value, key) => requestParams.append(key, value))
      
      return requestParams
    })(),
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  }, options)
  
  return _request(options)
}

/**
 * post json请求
 * @param {string} url
 * @param {object} data
 * @param {object} options
 * @returns {Promise}
 */
export function postJSON (url, data = {}, options = {}) {
  options = _.assign({
    url,
    method: 'post',
    data,
    headers: {'Content-Type': 'application/json'},
  }, options)
  
  return _request(options)
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
  options = _.assign({
    url,
    method: 'post',
    data: data instanceof FormData
      ? data
      : (function () {
        const formData = new FormData()
        _.each(data, (value, key) => formData.append(key, value))
        
        return formData
      })(),
    /**
     * 允许处理上传的进度事件
     */
    onUploadProgress,
    
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }, options)
  
  return _request(options)
}

/**
 * restful delete
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function del (url, data = {}, options = {}) {
  options = _.assign({
    url,
    method: 'delete',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  }, options)
  
  return _request(options)
}

/**
 * restful put
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function put (url, data = {}, options = {}) {
  options = _.assign({
    url,
    method: 'put',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  }, options)
  
  return _request(options)
}

/**
 * 并发执行多个请求
 * @returns {Promise.<*>}
 */
export function all (args) {
  return Array.isArray(args) ? Promise.all(args) : Promise.all([...arguments])
}

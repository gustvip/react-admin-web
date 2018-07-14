/**
 * created by joey 2018/02/19
 */
import EnumAPI from 'constants/enum_api'
import helper from './helper'
import queryString from 'query-string'
import localStorage from './local_storage'
import _ from 'lodash'
import * as request from './request'

class Auth {
  /**
   * 验证是否登录
   * @returns {boolean}
   */
  get isLogin () {
    const locationPathname = _.flowRight(helper.removeTrailingSlash, helper.removeBlank)(window.location.pathname)
    const isNeedGetLocalStorage = ENV.login.isCheckLogin && ENV.login.noCheckIsLoginRoutes.indexOf(locationPathname) === -1
    
    return isNeedGetLocalStorage
      ? this.getLoginStorageValue() === ENV.localStorage.login.value
      : true
  }
  
  /**
   * 获取localStorage(自定义)的login值
   * @returns {*}
   */
  getLoginStorageValue () {
    return localStorage.getItem(ENV.localStorage.login.key)
  }
  
  /**
   * 设置登录的localStorage(自定义)值
   */
  setLoginStorageValue () {
    const login = ENV.localStorage.login
    localStorage.setItem(login.key, login.value, login.expire)
  }
  
  /**
   * 移除登录的localStorage(自定义)值
   */
  removeLoginStorageValue () {
    localStorage.removeItem(ENV.localStorage.login.key)
  }
  
  /**
   * 获取localStorage(自定义)的user_name值
   * @returns {*}
   */
  getUserNameStorageValue () {
    return localStorage.getItem(ENV.localStorage.user_name.key)
  }
  
  /**
   * 设置登录的localStorage(自定义)的user_name值
   * @param {String} user_name_value 用户名
   */
  setUserNameStorageValue (user_name_value) {
    const user_name = ENV.localStorage.user_name
    localStorage.setItem(user_name.key, user_name_value, user_name.expire)
  }
  
  /**
   * 移除登录的localStorage(自定义)的user_name值
   */
  removeUserNameStorageValue () {
    localStorage.removeItem(ENV.localStorage.login.key)
  }
  
  /**
   * 获取localStorage(自定义)的user_password值
   * @returns {*}
   */
  getUserPasswordStorageValue () {
    return localStorage.getItem(ENV.localStorage.user_password.key)
  }
  
  /**
   * 设置登录的localStorage(自定义)的user_password值
   * @param {String} user_password_value 用户名
   */
  setUserPasswordStorageValue (user_password_value) {
    const user_password = ENV.localStorage.user_password
    localStorage.setItem(user_password.key, user_password_value, user_password.expire)
  }
  
  /**
   * 移除登录的localStorage(自定义)的user_password值
   */
  removeUserPasswordStorageValue () {
    localStorage.removeItem(ENV.localStorage.user_password.key)
  }
  
  /**
   * 登录
   * @param {String} user_name
   * @param {String} user_password
   * @param {[Function]} successCallback
   * @param {[Function]} failCallback
   */
  login ({user_name, user_password, successCallback = _.noop, failCallback = _.noop} = {}) {
    request.post(EnumAPI.user_login, {user_name, user_password}).then(info => successCallback(info)).catch(info => failCallback(info))
  }
  
  /**
   * 退出登录
   * @param {[Function]} successCallback
   * @param {[Function]} failCallback
   */
  logout ({successCallback = _.noop, failCallback = _.noop} = {}) {
    request.post(EnumAPI.user_logout).then(info => successCallback(info)).catch(info => failCallback(info))
  }
  
  /**
   * 登录成功重定向
   * @param {Object} history react-router的history
   * @param  {[Object]} state react-router的location.state
   */
  loginSuccessRedirect (history, state) {
    const urlParams = queryString.parse(window.location.search)
    let redirectUrl = ENV.login.defaultRedirectUrl
    
    if (helper.isObject(urlParams) && ENV.defaultQuery in urlParams) {
      redirectUrl = decodeURIComponent(urlParams[ENV.defaultQuery])
    }
    
    setTimeout(() => history.push(redirectUrl, state), 1000)
  }
}

export default new Auth()

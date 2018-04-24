/**
 * created by joey 2018/02/19
 */
import EnumAPI from 'constants/EnumAPI'
import helper from './helper'
import queryString from 'query-string'
import localStorage from './localStorage'
import ENV from 'ENV'
import _ from 'utils/core/lodash'
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
   * 获取localStorage的login值
   * @return {*|{value, configurable}}
   */
  getLoginStorageValue () {
    return localStorage.getItem(ENV.localStorage.login.key)
  }
  
  /**
   * 设置登录的localStorage值
   */
  setLoginStorageValue () {
    const login = ENV.localStorage.login
    localStorage.setItem(login.key, login.value, login.expire)
  }
  
  /**
   * 移除登录的localStorage值
   */
  removeLoginStorageValue () {
    localStorage.removeItem(ENV.localStorage.login.key)
  }
  
  /**
   * 登录
   */
  loginIn ({user_name, user_password, successCallback = _.noop, failCallback = _.noop} = {}) {
    request.post(EnumAPI.user_loginIn, {user_name, user_password}).then(info => successCallback(info)).catch(info => failCallback(info))
  }
  
  /**
   * 退出登录
   */
  loginOut ({successCallback = _.noop, failCallback = _.noop} = {}) {
    request.post(EnumAPI.user_loginOut).then(info => successCallback(info)).catch(info => failCallback(info))
  }
  
  /**
   * 登录成功重定向
   */
  loginSuccessRedirect (history, state) {
    const urlParams = queryString.parse(location.search)
    let redirectUrl = ENV.login.defaultRedirectUrl
    if (helper.isObject(urlParams) && ENV.defaultQuery in urlParams) {
      redirectUrl = decodeURIComponent(urlParams[ENV.defaultQuery])
    }
    
    setTimeout(() => history.push(redirectUrl, state), 1000)
  }
}

export default new Auth()

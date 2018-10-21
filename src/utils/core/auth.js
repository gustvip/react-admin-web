/**
 * Created by joey 2018/02/19
 */
import enumAPI from 'constants/enumAPI';
import * as queryString from './queryString';
import helper from './helper';
import localStorage from './localStorage';
import * as request from './request';

import flowRight from 'lodash/flowRight';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';

class Auth {
	constructor() {
		this.ENV = window.ENV;
	}
	
	/**
	 * 验证是否登录
	 * @returns {boolean}
	 */
	get isLogin() {
		const locationPathname = flowRight(helper.removeTrailingSlash, helper.removeBlank)(window.location.pathname);
		const isNeedGetLocalStorage = this.ENV.login.isCheckLogin && this.ENV.login.noCheckIsLoginRoutes.indexOf(locationPathname) === -1;
		
		return isNeedGetLocalStorage ? this.getLoginStorageValue() === this.ENV.localStorage.login.value : true;
	}
	
	/**
	 * 重置用户密码
	 * @param {string} userId
	 * @param {function} [successCallback]
	 * @param {function} [failCallback]
	 */
	resetUserPassword(userId, successCallback, failCallback) {
		request.postJSON(enumAPI.userResetPassword, {userId}).then(info => isFunction(successCallback) && successCallback(info)).catch(info => isFunction(failCallback) && failCallback(info));
	}
	
	/**
	 * 获取login
	 * @returns {*}
	 */
	getLoginStorageValue() {
		return localStorage.getItem(this.ENV.localStorage.login.key);
	}
	
	/**
	 * 设置login
	 */
	setLoginStorageValue() {
		const login = this.ENV.localStorage.login;
		localStorage.setItem(login.key, login.value, login.expire);
	}
	
	/**
	 * 移除login
	 */
	removeLoginStorageValue() {
		localStorage.removeItem(this.ENV.localStorage.login.key);
	}
	
	/**
	 * 获取userInfo
	 * @returns {*}
	 */
	getUserInfoStorageValue() {
		return localStorage.getItem(this.ENV.localStorage.userInfo.key);
	}
	
	/**
	 * 设置userInfo
	 */
	setUserInfoStorageValue(value) {
		const userInfo = this.ENV.localStorage.userInfo;
		localStorage.setItem(userInfo.key, value, userInfo.expire);
	}
	
	/**
	 * 移除userInfo
	 */
	removeUserInfoStorageValue() {
		localStorage.removeItem(this.ENV.localStorage.userInfo.key);
	}
	
	/**
	 * 登录
	 * @param {string} userName
	 * @param {string} userPassword
	 * @param {function} [successCallback]
	 * @param {function} [failCallback]
	 */
	login(userName, userPassword, successCallback, failCallback) {
		request.postJSON(enumAPI.userLogin, {
			userName,
			userPassword,
		}).then(info => isFunction(successCallback) && successCallback(info)).catch(info => isFunction(failCallback) && failCallback(info));
	}
	
	/**
	 * 登录成功重定向
	 * @param {Object} [history] react-router的history
	 * @param  {Object} [state] react-router的state
	 */
	loginSuccessRedirect(history, state) {
		const urlParams = queryString.parse(window.location.search);
		let redirectUrl = this.ENV.login.defaultRedirectUrl;
		
		if (helper.isObject(urlParams) && this.ENV.defaultQuery in urlParams) {
			redirectUrl = decodeURIComponent(urlParams[this.ENV.defaultQuery]);
		}
		
		setTimeout(() => history.push(redirectUrl, state), 1000);
	}
}

export default new Auth();

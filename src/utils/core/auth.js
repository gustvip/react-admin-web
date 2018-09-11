/**
 * created by joey 2018/02/19
 */
import enumAPI from 'constants/enumAPI';
import helper from './helper';
import queryString from 'query-string';
import localStorage from './localStorage';
import * as request from './request';

import flowRight from 'lodash/flowRight';
import isFunction from 'lodash/isFunction';

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
		
		return isNeedGetLocalStorage
			? this.getLoginStorageValue() === this.ENV.localStorage.login.value
			: true;
	}
	
	/**
	 * 获取localStorage(自定义)的login值
	 * @returns {*}
	 */
	getLoginStorageValue() {
		return localStorage.getItem(this.ENV.localStorage.login.key);
	}
	
	/**
	 * 设置登录的localStorage(自定义)值
	 */
	setLoginStorageValue() {
		const login = this.ENV.localStorage.login;
		localStorage.setItem(login.key, login.value, login.expire);
	}
	
	/**
	 * 移除登录的localStorage(自定义)值
	 */
	removeLoginStorageValue() {
		localStorage.removeItem(this.ENV.localStorage.login.key);
	}
	
	/**
	 * 获取localStorage(自定义)的user_name值
	 * @returns {*}
	 */
	getUserNameStorageValue() {
		return localStorage.getItem(this.ENV.localStorage.userName.key);
	}
	
	/**
	 * 设置登录的localStorage(自定义)的user_name值
	 * @param {string} userNameValue 用户名
	 */
	setUserNameStorageValue(userNameValue) {
		const userName = this.ENV.localStorage.userName;
		localStorage.setItem(userName.key, userNameValue, userName.expire);
	}
	
	/**
	 * 移除登录的localStorage(自定义)的userName值
	 */
	removeUserNameStorageValue() {
		localStorage.removeItem(this.ENV.localStorage.userName.key);
	}
	
	/**
	 * 获取localStorage(自定义)的userPassword值
	 * @returns {*}
	 */
	getUserPasswordStorageValue() {
		return localStorage.getItem(this.ENV.localStorage.userPassword.key);
	}
	
	/**
	 * 设置登录的localStorage(自定义)的userPassword值
	 * @param {string} userPasswordValue 用户名
	 */
	setUserPasswordStorageValue(userPasswordValue) {
		const userPassword = this.ENV.localStorage.userPassword;
		localStorage.setItem(userPassword.key, userPasswordValue, userPassword.expire);
	}
	
	/**
	 * 移除登录的localStorage(自定义)的user_password值
	 */
	removeUserPasswordStorageValue() {
		localStorage.removeItem(this.ENV.localStorage.userPassword.key);
	}
	
	/**
	 * 登录
	 * @param {string} userName
	 * @param {string} userPassword
	 * @param {function} [successCallback]
	 * @param {function} [failCallback]
	 */
	login(userName, userPassword, successCallback, failCallback) {
		request.post(enumAPI.user_login, {
			userName,
			userPassword,
		})
			.then(info => isFunction(successCallback) && successCallback(info))
			.catch(info => isFunction(failCallback) && failCallback(info));
	}
	
	/**
	 * 登录成功重定向
	 * @param {Object} history react-router的history
	 * @param  {[Object]} state react-router的location.state
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

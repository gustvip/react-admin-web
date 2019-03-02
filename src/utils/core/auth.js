/**
 * Created by joey 2018/02/19
 */
import PropTypes from 'prop-types';
import React from 'react';
import enumAPI from 'constants/enumAPI';
import * as enumCommon from 'constants/app/common';
import qs from 'qs';
import helper from './helper';
import localStorage from './localStorage';
import * as request from './request';

import { flowRight, isFunction, get } from 'lodash';

class Auth {
	constructor () {
		this.ENV = window.ENV;
	}
	
	/**
	 * 验证是api或者route是否有权限
	 * @param api
	 * @return boolean
	 */
	hasAuth (info) {
		const auth = get(this.getUserInfoStorageValue(), this.ENV.login.auth, []);
		return auth.indexOf(info) !== -1;
	}
	
	/**
	 * 验证是否登录
	 * @returns {boolean}
	 */
	get isLogin () {
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
	resetUserPassword (userId, successCallback, failCallback) {
		request.postJSON(enumAPI.userResetPassword, {userId}).then(info => isFunction(successCallback) && successCallback(info)).catch(info => isFunction(failCallback) && failCallback(info));
	}
	
	/**
	 * 获取login
	 * @returns {*}
	 */
	getLoginStorageValue () {
		return localStorage.getItem(this.ENV.localStorage.login.key);
	}
	
	/**
	 * 设置login
	 */
	setLoginStorageValue () {
		const login = this.ENV.localStorage.login;
		localStorage.setItem(login.key, login.value, login.expire);
	}
	
	/**
	 * 移除login
	 */
	removeLoginStorageValue () {
		localStorage.removeItem(this.ENV.localStorage.login.key);
	}
	
	/**
	 * 获取userInfo
	 * @returns {*}
	 */
	getUserInfoStorageValue () {
		return localStorage.getItem(this.ENV.localStorage.userInfo.key);
	}
	
	/**
	 * 是否为administrator
	 * @returns {Boolean}
	 */
	get isAdministrator () {
		const loginUserDetail = this.getUserDetailStorageValue();
		return loginUserDetail.group === enumCommon.group.root.value && loginUserDetail.role === enumCommon.role.root.value;
	}
	
	/**
	 * 是否为root
	 * @returns {Boolean}
	 */
	isRoot () {
		return this.getUserDetailStorageValue().role === enumCommon.role.root.value;
	}
	
	/**
	 * 是否为admin
	 * @returns {Boolean}
	 */
	isAdmin () {
		return this.getUserDetailStorageValue().role === enumCommon.role.admin.value;
	}
	
	/**
	 * 获取user详情
	 * @returns {Object}
	 */
	getUserDetailStorageValue () {
		return get(this.getUserInfoStorageValue(), this.ENV.login.userDetail, {});
	}
	
	/**
	 * 设置userInfo
	 */
	setUserInfoStorageValue (value) {
		const userInfo = this.ENV.localStorage.userInfo;
		localStorage.setItem(userInfo.key, value, userInfo.expire);
	}
	
	/**
	 * 移除userInfo
	 */
	removeUserInfoStorageValue () {
		localStorage.removeItem(this.ENV.localStorage.userInfo.key);
	}
	
	/**
	 * 登录
	 * @param {string} userName
	 * @param {string} userPassword
	 * @param {function} [successCallback]
	 * @param {function} [failCallback]
	 */
	login (userName, userPassword, successCallback, failCallback) {
		request.postJSON(enumAPI.userLogin, {
			userName,
			userPassword,
		}).then(info => isFunction(successCallback) && successCallback(info)).catch(info => isFunction(failCallback) && failCallback(info));
	}
	
	/**
	 * 退出登录
	 * @param {function} [successCallback]
	 * @param {function} [failCallback]
	 */
	loginOut (successCallback, failCallback) {
		request.postJSON(enumAPI.userLoginOut).then(info => isFunction(successCallback) && successCallback(info)).catch(info => isFunction(failCallback) && failCallback(info));
	}
	
	/**
	 * 登录成功重定向
	 * @param {Object} history react-router的history
	 * @param  {Object} [state] react-router的state
	 */
	loginSuccessRedirect (history, state) {
		const urlParams = qs.parse(window.location.search);
		let redirectUrl = this.ENV.login.defaultRedirectUrl;
		
		if (helper.isPureObject(urlParams) && this.ENV.defaultQuery in urlParams) {
			redirectUrl = decodeURIComponent(urlParams[this.ENV.defaultQuery]);
		}
		
		setTimeout(() => history.push(redirectUrl, state), 1000);
	}
}

const auth = new Auth();

export function AuthComponent (props) {
	return auth.hasAuth(props.auth) && props.children;
}

AuthComponent.propTypes = {
	auth: PropTypes.string.isRequired,
	children: PropTypes.any,
};
export default auth;

/**
 * Created by joey on 2018/2/19
 */
import axios from "axios";
import forOwn from "lodash/forOwn";
import isPlainObject from "lodash/isPlainObject";
import noop from "lodash/noop";
import merge from "lodash/merge";
import transform from "lodash/transform";
import isArray from "lodash/isArray";

/**
 * 将对象转化为FormData数据格式
 * @param {Object} obj
 * @param {Object} [form]
 * @param {String} [namespace]
 * @returns {*|FormData}
 */
function objectToFormData(obj, form, namespace) {
	function isFile(x) {
		return Object.prototype.toString.call(x) === "[object File]";
	}
	
	const fd = form || new FormData();
	let formKey;
	forOwn(obj, (value, property) => {
		let key = isArray(obj) ? "[]" : `[${property}]`;
		if (namespace) {
			formKey = namespace + key;
		} else {
			formKey = property;
		}
		
		if (isPlainObject(value) && !isFile(value)) {
			objectToFormData(obj[property], fd, formKey);
		} else {
			fd.append(formKey, obj[property]);
		}
	});
	
	return fd;
}

/**
 * 解决IE报warning Unhandled Rejections Error 参数书不正确的问题
 * @private
 */
Promise._unhandledRejectionFn = noop;

const singleton = (function() {
	let instantiated;
	const baseURL = ENV.apiDomain;
	
	function init() {
		const instance = axios.create({
			baseURL,
			
			withCredentials: true,
			
			/**
			 * 表示服务器将响应的数据类型
			 * 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
			 */
			responseType: "json",
			
			headers: {
				// "X-Requested-With": "XMLHttpRequest",
			},
		});
		
		/**
		 * 请求的拦截
		 */
		instance.interceptors.request.use(function(config) {
			return config;
		}, function(error) {
			return Promise.reject(error);
		});
		
		/**
		 * 响应的拦截
		 */
		instance.interceptors.response.use(function(response) {
			return response;
		}, function(error) {
			return Promise.reject(error);
		});
		
		return instance;
	}
	
	return {
		getInstance() {
			return instantiated ? instantiated : instantiated = init();
		},
	};
}());

/**
 * 请求中转函数
 * @param {Object} options
 * @return {Promise}
 * @private
 */
const _request = (options = {}) => {
	return new Promise((resolve, reject) => {
		singleton.getInstance().request(options).then((info) => {
			const {data, code, msg} = info.data;
			if (ENV.apiSuccessCode === code) {
				resolve({
					code,
					data,
					msg,
				});
			} else {
				reject({
					code,
					data,
					msg,
				});
			}
		}).catch((info) => {
			if (info) {
				reject({
					code: info.code,
					data: info.data,
					msg: info.message,
				});
			} else {
				reject({msg: "unknown error"});
			}
		});
	});
};

/**
 * Get请求
 * @param {String} url
 * @param {Object} params
 * @param {Object} options
 * @returns {Promise}
 */
export function get(url, params = {}, options = {}) {
	return _request(merge({
		url,
		method: "get",
		params,
	}, options));
}

/**
 * Post请求
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function post(url, data = {}, options = {}) {
	return _request(merge({
		url,
		method: "post",
		data: transform(data, (prev, value, key) => prev.append(key, value), new URLSearchParams()),
		headers: {"Content-Type": "application/x-www-form-urlencoded; charset=utf-8"},
	}, options));
}

/**
 * Post json请求
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function postJSON(url, data = {}, options = {}) {
	return _request(merge({
		url,
		method: "post",
		data,
		headers: {"Content-Type": "application/json; charset=utf-8"},
	}, options));
}

/**
 * form-data传输数据
 * @param {String} url
 * @param {Object} data
 * @param {Function} onUploadProgress
 * @param {Object} options
 * @returns {Promise}
 */
export function upload(url, data = {}, options = {}, onUploadProgress = noop) {
	return _request(merge({
		url,
		method: "post",
		data: objectToFormData(data),
		onUploadProgress,
	}, options));
}

/**
 * Restful delete
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function del(url, data = {}, options = {}) {
	return _request(merge({
		url,
		method: "delete",
		data,
		headers: {"Content-Type": "application/json; charset=utf-8"},
	}, options));
}

/**
 * Restful put
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function put(url, data = {}, options = {}) {
	return _request(merge({
		url,
		method: "put",
		data,
		headers: {"Content-Type": "application/json; charset=utf-8"},
	}, options));
}

/**
 * 发送一个form请求
 * @param {String} url
 * @param {Object} property 表单属性
 * @param {Object} params 请求参数
 * @return {HTMLElement}
 */
export function form(url, property = {}, params = {}) {
	property = merge({
		enctype: "application/x-www-form-urlencoded",
		method: "POST",
		target: "_blank",
	}, property);
	
	const formElement = document.createElement("form");
	formElement.style.display = "none";
	
	forOwn(property, (value, key) => {
		formElement.setAttribute(key, value);
	});
	
	forOwn(params, (value, key) => {
		const hideElement = document.createElement("input");
		hideElement.setAttribute("type", "hidden");
		hideElement.setAttribute("name", key);
		hideElement.setAttribute("value", encodeURIComponent(value));
		formElement.appendChild(hideElement);
	});
	
	document.body.appendChild(formElement);
	return formElement;
}

/**
 * 并发执行多个请求
 * @returns {Promise.<*>}
 */
export function all(args) {
	return Promise.all(isArray(args) ? args : [].slice.call(arguments));
}

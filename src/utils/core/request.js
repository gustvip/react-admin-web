/**
 * Created by joey on 2018/2/19
 */
import axios from 'axios';
import forOwn from 'lodash/forOwn';
import forEach from 'lodash/forEach';
import noop from 'lodash/noop';
import transform from 'lodash/transform';

/**
 * 将对象转化为FormData数据格式
 * @param {Object | Array} obj
 * @param {FormData} [form]
 * @param {String} [namespace]
 * @returns {FormData}
 */
function objectToFormData(obj, form, namespace) {
	const fd = form || new FormData();
	let formKey;
	forEach(obj, (value, property) => {
		if (namespace) {
			formKey = `${namespace}[${property}]`;
		} else {
			formKey = Array.isArray(obj) ? `[${property}]` : property + '';
		}
		
		if (typeof value === 'object' && !(value instanceof File)) {
			objectToFormData(value, fd, formKey);
		} else if (Array.isArray(value)) {
			objectToFormData(value, fd, formKey);
		} else {
			fd.append(formKey, value);
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
			responseType: 'json',
			
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
				reject({msg: 'unknown error'});
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
	return _request(Object.assign({
		url,
		method: 'get',
		params,
	}, options));
}

/**
 * Post请求 Content-Type application/x-www-form-urlencoded
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function post(url, data = {}, options = {}) {
	return _request(Object.assign({
		url,
		method: 'post',
		data: transform(data, (prev, value, key) => prev.append(key, value), new URLSearchParams()),
	}, options));
}

/**
 * Post Content-Type application/json
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function postJSON(url, data = {}, options = {}) {
	return _request(Object.assign({
		url,
		method: 'post',
		data,
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
	return _request(Object.assign({
		url,
		method: 'post',
		data: objectToFormData(data),
		onUploadProgress,
	}, options));
}

/**
 * Delete Content-Type application/json
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function del(url, data = {}, options = {}) {
	return _request(Object.assign({
		url,
		method: 'delete',
		data,
	}, options));
}

/**
 * Put Content-Type application/json
 * @param {String} url
 * @param {Object} data
 * @param {Object} options
 * @returns {Promise}
 */
export function put(url, data = {}, options = {}) {
	return _request(Object.assign({
		url,
		method: 'put',
		data,
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
	property = Object.assign({
		enctype: 'application/x-www-form-urlencoded',
		method: 'POST',
		target: '_blank',
		action: url,
	}, property);
	const formId = '__render-form-dom-id__';
	let formElement = document.querySelector('#' + formId);
	if (!formElement) {
		formElement = document.createElement('form');
		formElement.id = formId;
		formElement.style.display = 'none';
	}
	document.body.removeChild(formElement);
	
	forOwn(property, (value, key) => {
		formElement.setAttribute(key, value);
	});
	
	forOwn(params, (value, key) => {
		const hideElement = document.createElement('input');
		hideElement.setAttribute('type', 'hidden');
		hideElement.setAttribute('name', key);
		hideElement.setAttribute('value', encodeURIComponent(value));
		formElement.appendChild(hideElement);
	});
	
	document.body.appendChild(formElement);
	return formElement;
}

/**
 * 下载文件
 * @param {string} url
 * @param {string} [fileName]
 */
export const downLoadUrl = function(url, fileName = Date.now().toString(10)) {
	const id = '__read-and-down-image-id__';
	let newLink = document.querySelector('#' + id);
	if (!newLink) {
		newLink = document.createElement('a');
		newLink.id = id;
		document.body.appendChild(newLink);
	}
	newLink.href = url;
	newLink.download = fileName;
	newLink.click();
};

/**
 * 并发执行多个请求
 * @param {Array | function} args
 * @return {Promise<[any , any , any , any , any , any , any , any , any , any]>}
 */
export function all(args) {
	return Promise.all(Array.isArray(args) ? args : [].slice.call(arguments));
}

/**
 * Created by joey on 2018/2/19
 */
import { create, CancelToken } from 'axios';
import _ from 'lodash';
const source = CancelToken.source();

/**
 * 将对象转化为FormDate数据格式
 * @param {Object} obj
 * @param {Object} [form]
 * @param {String} [namespace]
 * @returns {*|FormData}
 */
function objectToFormData (obj, form, namespace) {
	const fd = form || new FormData();
	let formKey;
	_.forOwn(obj, ((value, property) => {
		let key = Array.isArray(obj) ? '[]' : `[${property}]`;
		if (namespace) {
			formKey = namespace + key;
		} else {
			formKey = property;
		}
		
		if (_.isPlainObject(value) && !value instanceof File) {
			objectToFormData(obj[property], fd, formKey);
		} else {
			fd.append(formKey, obj[property]);
		}
	}));
	
	return fd;
}

/**
 * 解决IE报warning Unhandled Rejections Error 参数书不正确的问题
 * @private
 */
Promise._unhandledRejectionFn = _.noop;

const singleton = (function () {
	let instantiated;
	const baseURL = ENV.apiDomain;
	
	function init () {
		
		return create({
			baseURL,
			
			withCredentials: true,
			
			/**
			 * 表示服务器将响应的数据类型
			 * 包括 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
			 */
			responseType: 'json',
			
			// 取消请求的令牌
			cancelToken: source.token,
			
			headers: {
				//'X-Requested-With': 'XMLHttpRequest',
			},
		});
	}
	
	return {
		getInstance () {
			return instantiated ? instantiated : instantiated = init();
		},
	};
})();

/**
 * 请求中转函数
 * @param {Object} options
 * @return {Promise}
 * @private
 */
const _request = (options = {}) => {
	return new Promise((resolve, reject) => {
		singleton.getInstance().request(options).then(info => {
			const {data, code, msg} = info.data;
			
			if (ENV.apiSuccessCode === code) {
				resolve({code, data, msg});
			} else {
				reject({code, data, msg});
			}
		}).catch(info => {
			reject({code: info.code, data: info.data, msg: info.message});
		});
	});
};

/**
 * 取消请求
 * @param {string} reason
 */
export function cancelAllRequest (reason = '') {
	source.cancel(reason);
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
	}, options));
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
		data: _.transform(data, (prev, value, key) => prev.append(key, value), new URLSearchParams()),
		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	}, options));
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
	}, options));
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
		data: objectToFormData(data),
		onUploadProgress,
		headers: {'Content-Type': 'multipart/form-data'},
	}, options));
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
	}, options));
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
	}, options));
}

/**
 * 并发执行多个请求
 * @returns {Promise.<*>}
 */
export function all (args) {
	return Array.isArray(args) ? Promise.all(args) : Promise.all([...arguments]);
}

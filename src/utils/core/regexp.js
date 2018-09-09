/**
 * Created by joey on 2018/2/18
 */

/**
 * 常用正则
 * @type {{name: RegExp, password: RegExp, url: RegExp, email: RegExp, html: RegExp, ip: RegExp, chinese: RegExp, telephone: RegExp}}
 */
const regExpHelper = {
	name: /^[a-z-A-Z_]\w{7,15}$/,
	password: /^\w{6,18}$/,
	url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/,
	email: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
	html: /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/,
	ip: /((2[0-4]\d|25[0-5]|[01]?\d\d?)\.){3}(2[0-4]\d|25[0-5]|[01]?\d\d?)/,
	chinese: /^[\u2E80-\u9FFF]+$/,
	telephone: /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/,
};

export default regExpHelper;

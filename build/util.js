const os = require('os');
const flattenDeep = require('lodash/flattenDeep');
const path = require('path');

/**
 * 获取本机IPv4地址
 * @return {Number}
 */
exports.getLocalIp = function fn() {
	return flattenDeep(Object.values(os.networkInterfaces())).find(value => value.family === 'IPv4' && value.address !== '127.0.0.1' && !value.internal).address;
};

// ant-design 自定义less变量
exports.customAntStyle = {
	'@icon-url': '/assets/antd-iconfont/iconfont',
};

const entryPath = path.normalize(path.join(__dirname, '../public'));

/**
 * 项目常用路径
 * @type {{entryPath: string | void | *, devPublicPath: string}}
 */
exports.enumPath = {
	entryPath,
	devPublicPath: '/',
};

/**
 * 前后端协议、主机、端口的枚举
 * @type {{defaultWebProtocol: string, defaultWebHost: string, defaultWebPort: number, defaultServerNodeProtocol: string, defaultServerNodeHost: string, defaultServerNodePort: number}}
 */
exports.enumHostAndPortAndProtocol = {
	defaultWebProtocol: 'http',
	defaultWebHost: 'localhost',
	defaultWebPort: 11111,
	defaultServerNodeProtocol: 'http',
	defaultServerNodeHost: 'localhost',
	defaultServerNodePort: 8081,
};

exports.excludeRegex = /node_modules/;

exports.resourceName = {
	assets: 'assets',
	css: 'css',
	js: 'js',
	image: 'image',
	font: 'font',
	media: 'media',
	document: 'document',
};

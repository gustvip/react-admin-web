const os = require('os');
const flattenDeep = require('lodash/flattenDeep');

/**
 * 获取本机IPv4地址
 * @returns {null}
 */
exports.getLocalIp = function() {
	return flattenDeep(Object.values(os.networkInterfaces())).find(value => value.family === 'IPv4' && value.address !== '127.0.0.1' && !value.internal).address;
};

exports.customAntStyle = {
	'@icon-url': '/assets/antd-iconfont/iconfont',
};

exports.excludeRegex = /node_modules/;

exports.resourceBaseName = 'assets';

const os = require('os');

function flattenDeep (array) {
	const result = [];
	!(function fn (_array) {
		_array.forEach(value => {
			Array.isArray(value) ? fn(value) : result.push(value);
		});
	})(array);
	return result;
}

/**
 * 获取本机IPv4地址
 * @returns {null}
 */
function getLocalIp () {
	return flattenDeep(Object.values(os.networkInterfaces())).find(value => value.family === 'IPv4' && value.address !== '127.0.0.1' && !value.internal).address;
}

const customAntdStyle = {
	'@text-color': '#333',                  // 修改字体基本颜色
	'@font-size-base': '12px',                      // 修改基础字体大小
};
const excludeRegex = /node_modules/;

module.exports = {
	excludeRegex,
	customAntdStyle,
	getLocalIp,
	resourceBaseName: 'resources',
};

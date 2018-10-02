const os = require("os");

function flattenDeep(array) {
	const result = [];
	!(function fn(_array) {
		_array.forEach((value) => {
			Array.isArray(value) ? fn(value) : result.push(value);
		});
	}(array));
	return result;
}

/**
 * 获取本机IPv4地址
 * @returns {null}
 */
exports.getLocalIp = function() {
	return flattenDeep(Object.values(os.networkInterfaces())).find(value => value.family === "IPv4" && value.address !== "127.0.0.1" && !value.internal).address;
};

exports.customAntdStyle = {
	"@icon-url": "/asserts/antd-iconfont/iconfont",
	"@text-color": "#333", // 修改字体基本颜色
	"@font-size-base": "12px", // 修改基础字体大小
};
exports.excludeRegex = /node_modules/;

exports.resourceBaseName = "resources";

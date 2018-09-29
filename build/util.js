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
	"@text-color": "#333", // 修改字体基本颜色
	"@font-size-base": "12px", // 修改基础字体大小
};
exports.excludeRegex = /node_modules/;

exports.resourceBaseName = "resources";

exports.dateFormat = (timestamp = Date.now(), fmt = "yyyy-MM-dd hh:mm:ss") => {
	const date = new Date(timestamp);
	
	const o = {
		"y+": date.getFullYear(),
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"q+": Math.floor((date.getMonth() + 3) / 3),
		"S+": date.getMilliseconds(),
	};
	
	for (let k in o) {
		if (Object.prototype.hasOwnProperty.call(k) && new RegExp("(" + k + ")").test(fmt)) {
			if (k === "y+") {
				fmt = fmt.replace(RegExp.$1, ("" + o[k]).substr(4 - RegExp.$1.length));
			} else if (k === "S+") {
				let lens = RegExp.$1.length;
				lens = lens === 1 ? 3 : lens;
				fmt = fmt.replace(RegExp.$1, ("00" + o[k]).substr(("" + o[k]).length - 1, lens));
			} else {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
	}
	
	return fmt;
};

const fontColor = {
	black: "\033[30m",
	red: "\033[31m",
	green: "\033[32m",
	yellow: "\033[33m",
	blue: "\033[34m",
	purple: "\033[35m",
	darkGreen: "\033[36m",
	white: "\033[37m",
};

let colorFn = {};
Object.keys(fontColor).forEach(colorKey => {
	colorFn[colorKey] = (str) => console.log(`${fontColor[colorKey]}${str}` + "\033[0m");
});
exports.clc = colorFn;

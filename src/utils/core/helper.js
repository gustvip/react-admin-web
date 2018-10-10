import get from "lodash/get";
import identity from "lodash/identity";
import each from "lodash/each";
import isString from "lodash/isString";
import isNumber from "lodash/isNumber";
import classNames from "classnames";

class Helper {
	/**
	 * 生成uuid
	 * @param {number} len
	 * @param {number} radix
	 * @return {string}
	 */
	uuid(len, radix) {
		var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
		var uuid = [];
		var i;
		var r;
		radix = radix || chars.length;
		
		if (len) {
			for (i = 0; i < len; i++) {
				uuid[i] = chars[0 | Math.random() * radix];
			}
		} else {
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
			uuid[14] = "4";
			
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random() * 16;
					uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		
		return uuid.join("");
	}
	
	/**
	 * Ant-design排序
	 * @param {Object} prev
	 * @param {Object} now
	 * @param {String} property
	 * @return {number}
	 */
	sort({prev, now, property} = {}) {
		const prevValue = get(prev, property);
		const nowValue = get(now, property);
		if (prevValue < nowValue) {
			return -1;
		}
		if (prevValue > nowValue) {
			return 1;
		}
		return 0;
	}
	
	/**
	 * @param {*} data
	 * @param {Function} callback
	 * @param {Boolean} enumerable 属性是否可以枚举
	 * @return {*}
	 */
	immutable(data, callback = identity, enumerable = true) {
		const self = this;
		return (function fn(_data) {
			let result = _data;
			if (self.isObject(_data) || Array.isArray(_data)) {
				result = Array.isArray(_data) ? [] : {};
				each(_data, (value, key) => {
					Object.defineProperty(result, key, {
						value: fn(callback(value, key)),
						enumerable,
					});
				});
			}
			return result;
		}(data));
	}
	
	/**
	 * 设置class
	 * @param {*} basisClass 不是字符串，默认为iconfont,不想加传递''
	 * @return {Function}
	 */
	classNames(basisClass) {
		return (...rest) => classNames(isString(basisClass) ? basisClass : "iconfont", ...rest);
	}
	
	/**
	 * 字符串类型的渲染默认值
	 * @param {String}    val  检测的字段
	 * @param {String}    defaultVal  不满足条件的默认值
	 * @return {String}
	 */
	showValue(val, defaultVal = "-") {
		return (this.checkString(val) || this.isUsefulNumber(val)) ? val : defaultVal;
	}
	
	/**
	 * 检测长度大于0的数组或者类数组对象---Array,nodeList
	 * @param {*} x
	 * @return {Boolean}
	 */
	checkArray(x) {
		return Array.isArray(x) && x.length > 0;
	}
	
	/**
	 * 检测去除左右空白后长度大于0的字符串
	 * @param {*} x
	 * @return {Boolean}
	 */
	checkString(x) {
		return isString(x) && x.trim().length > 0;
	}
	
	/**
	 * 是否为纯的对象
	 * @param x
	 * @return {boolean}
	 */
	isObject(x) {
		return Object.prototype.toString.call(x) === "[object Object]";
	}
	
	/**
	 * 检测不为NaN、Infinity、-Infinity的Number
	 * @param {*} x
	 * @return {Boolean}
	 */
	isUsefulNumber(x) {
		return isNumber(x) && isFinite(x);
	}
	
	/**
	 * 去除尾部下划线
	 * @param {String} x
	 */
	removeTrailingSlash(x) {
		return /\/$/.test(x) ? x.slice(0, x.length - 1) : x;
	}
	
	/**
	 * 去除字符串的空白
	 * @param {String} x
	 * @return {* || String}
	 */
	removeBlank(x) {
		return isString(x) ? x.replace(/\s/g, "") : x;
	}
	
	/**
	 * 根据值查找路径
	 * @param {Array} data
	 * @param {*} stopValue 停止的值
	 * @param {string} property
	 * @return {Array}
	 */
	findPath(data, stopValue, property) {
		let tag = false;
		let array = [];
		if (Array.isArray(data)) {
			(function fn(_data, _array) {
				let index = -1;
				while (!tag && ++index < _data.length) {
					const rowData = _data[index];
					const rowArray = _array.slice();
					rowArray.push(rowData[property]);
					if (rowData[property] === stopValue) {
						array = rowArray;
						tag = true;
					} else {
						Array.isArray(rowData.children) && rowData.children.length && fn(rowData.children, rowArray.slice());
					}
				}
			}(data, array.slice()));
		}
		return array;
	}
	
	/**
	 * 浮点型保留小数
	 * @param {*} num 要转化的数字
	 * @param {Number} fixNum 小数位数
	 * @param {String} defaultVal 格式化错误的默认值
	 * @return {String}
	 */
	toFixed(num, fixNum = 2, defaultVal = "-") {
		num = Number(num);
		return !isFinite(num) ? defaultVal : num.toFixed(fixNum);
	}
}

export default new Helper();

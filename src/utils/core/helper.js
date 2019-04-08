import {get, identity, forEach, forOwn, isString, groupBy, round, toFinite, minBy, maxBy, isFinite as IsFinite} from 'lodash';
import classNames from 'classnames';
import {render as reactDomRender, unmountComponentAtNode} from 'react-dom';

class Helper {
	/**
	 * 连接url
	 * @param {string} baseUrl
	 * @param {string} relativeUrl
	 * @return {string}
	 */
	combineUrl(baseUrl, relativeUrl) {
		return relativeUrl ? `${baseUrl.replace(/\/+$/, '') }/${ relativeUrl.replace(/^\/+/, '')}` : baseUrl;
	}
	
	/**
	 * 时间格式化
	 * @param { Date | Number} date
	 * @param {string} template
	 * @return {string}
	 */
	dateFormat(date = Date.now(), template = 'YYYY-MM-DD HH:mm:ss') {
		return moment(date).format(template);
	}
	
	/**
	 * @param {*} x
	 * @return {{index: *, base: string}}
	 */
	getNumberBase(x, radix = 1024) {
		const baseCollection = ['B', 'K', 'M', 'G', 'T'];
		x = toFinite(Math.abs(x));
		if (x < radix) {
			return {
				index: 0,
				base: baseCollection[0],
			};
		}
		let index = Math.floor(Math.log(x) / Math.log(radix));
		index = index >= baseCollection.length ? baseCollection.length - 1 : index;
		return {
			index,
			base: baseCollection[index],
		};
	}
	
	/**
	 * @param x 字节大小
	 * @param w 保留小数位数
	 * @returns {string}
	 */
	autoToSize(x, w = 2) {
		const base = this.getNumberBase(x);
		return round(toFinite(x) / Math.pow(1024, base.index), w) + base.base;
	}
	
	/**
	 * 将[{},{}...]转化为tree的数据结构
	 * @param {Array} data
	 * @param {string | number} parentIdName 指向parent的key
	 * @param {string | number} ownIdName 指向own的key
	 * @param {string} [childrenName] 生成children的key
	 * @param {number} [treeDepth] 树的深度
	 * @return {Array}
	 */
	formatTreeData(data, parentIdName, ownIdName, childrenName = 'children', treeDepth = 20000) {
		// 格式化children的值
		data = data.map(value => {
			value[childrenName] = Array.isArray(value[childrenName]) ? value[childrenName] : [];
			return value;
		});
		
		// 分组
		const result = [];
		const groupData = data.reduce((prev, value) => {
			if (!value[parentIdName]) {
				result.push(value);
			} else if (prev[value[parentIdName]]) {
				prev[value[parentIdName]].push(value);
			} else {
				prev[value[parentIdName]] = [value];
			}
			return prev;
		}, {});
		
		// 递归格式化树
		!(function format(childData, index) {
			if (index <= treeDepth) {
				childData.forEach(value => {
					forOwn(groupData, (val, key) => {
						if (value[ownIdName] == key) {
							value[childrenName] = value[childrenName].concat(val);
						}
					});
					value[childrenName].length && format(value[childrenName], index + 1);
				});
			}
		}(result, 2));
		
		return result;
	}
	
	/**
	 * 渲染弹出窗Modal
	 * @param {ReactElement} component react组件
	 */
	renderModal(component) {
		const domId = '__render-modal-dom-id__';
		const oldDomElement = document.querySelector(`#${ domId}`);
		if (oldDomElement) {
			unmountComponentAtNode(oldDomElement);
			document.body.removeChild(oldDomElement);
		}
		const newDomElement = document.createElement('div');
		newDomElement.id = domId;
		document.body.appendChild(newDomElement);
		reactDomRender(component, newDomElement);
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
		if (prevValue === nowValue) {
			return 0;
		}
		return prevValue < nowValue ? -1 : 1;
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
			if (self.isPureObject(_data) || Array.isArray(_data)) {
				result = Array.isArray(_data) ? [] : {};
				forEach(_data, (value, key) => {
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
		return (...rest) => classNames(isString(basisClass) ? basisClass : 'iconfont', ...rest);
	}
	
	/**
	 * 字符串类型的渲染默认值
	 * @param {String}    val  检测的字段
	 * @param {String}    defaultVal  不满足条件的默认值
	 * @return {String}
	 */
	showValue(val, defaultVal = '-') {
		return (this.checkString(val) || IsFinite(val)) ? val : defaultVal;
	}
	
	/**
	 * 检测长度大于0的数组或者类数组对象---Array
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
	isPureObject(x) {
		return Object.prototype.toString.call(x) === '[object Object]';
	}
	
	/**
	 * 去除尾部下划线
	 * @param {String} x
	 */
	removeTrailingSlash(x) {
		return x.replace(/\/+$/g, '');
	}
	
	/**
	 * 去除字符串的空白
	 * @param {String} x
	 * @return {String}
	 */
	removeBlank(x) {
		return x.replace(/\s/g, '');
	}
	
	/**
	 * 根据值查找路径
	 * @param {Array} data
	 * @param {*} stopValue 停止的值
	 * @param {string} property
	 * @param {function} [callback]
	 * @return {Array}
	 */
	findPath(data, stopValue, property, callback) {
		const self = this;
		let tag = false;
		let array = [];
		if (Array.isArray(data)) {
			(function fn(_data, _array) {
				let index = -1;
				while (!tag && ++index < _data.length) {
					const rowData = _data[index];
					const rowArray = _array.slice();
					rowArray.push(callback ? callback(rowData) : rowData[property]);
					if (rowData[property] === stopValue) {
						array = rowArray;
						tag = true;
					} else {
						self.checkArray(rowData.children) && fn(rowData.children, rowArray.slice());
					}
				}
			}(data, array.slice()));
		}
		return array;
	}
}

export default new Helper();

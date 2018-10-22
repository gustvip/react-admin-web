/**
 * Created by joey 2018/02/20
 */
import isPureObject from '../utils/isPureObject';
import isString from '../utils/isString';
import isNumber from '../utils/isNumber';
import isBoolean from '../utils/isBoolean';
import _objectForEach from '../utils/aaa/_objectForEach';
import toInteger from '../utils/toInteger';
import isInteger from '../utils/isInteger';

// 无限期
var NO_EXPIRE = 0;
// localStorage的key
var STORAGE_KEY = '__STORAGE__';
// 临时存储的变量
var storageValue = (function() {
	var result = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
	return isPureObject(result) ? result : {};
}());

function canJSON(x) {
	return isString(x) || isNumber(x) || isPureObject(x) || Array.isArray(x) || isBoolean(x);
}

/**
 * 判断是否新鲜
 * @param {Number} expTime
 * @returns {Boolean}
 */
function isFresh(expTime) {
	return (expTime === NO_EXPIRE) || (isInteger(expTime) && expTime - Date.now() > 0);
}

/**
 * 更新localStorage
 * @param {String} key
 * @param {String || Number || Boolean || Object || Array} value
 */
function update(key, value) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * 获取长度
 * @return {Number}
 */
function length() {
	clearExpired();
	update(STORAGE_KEY, storageValue);
	return Object.keys(storageValue).length;
}

/**
 * 清空过期的数据
 */
function clearExpired() {
	_objectForEach(storageValue, function(value, key) {
		if (!isPureObject(value) || !canJSON(value.value) || !isFresh(value.expire)) {
			delete storageValue[key];
		}
	});
}

/**
 * @param {String} key
 * @param {String || Number ||  Boolean || Array || Object} value
 * @param {Number} expTime 过期时间
 */
function setItem(key, value, expTime) {
	clearExpired();
	if (canJSON(value)) {
		expTime = toInteger(expTime);
		expTime = expTime < 0 ? NO_EXPIRE : expTime;
		storageValue[key] = {
			value,
			expire: expTime === NO_EXPIRE ? NO_EXPIRE : expTime + Date.now(),
		};
	}
	update(STORAGE_KEY, storageValue);
}

/**
 * @param {String} key
 * @returns {String || Boolean || Number || Array || Object || Undefined}
 */
function getItem(key) {
	clearExpired();
	update(STORAGE_KEY, storageValue);
	var storage = storageValue[key];
	return storage ? storage.value : undefined;
}

/**
 * @param {String} key
 * @param {Number} expTime 过期时间
 * @return {Boolean}
 */
function keepItemExpire(key, expTime) {
	clearExpired();
	var storage = storageValue[key];
	if (storage) {
		expTime = toInteger(expTime);
		storage.expire += expTime;
		if (storage.expire !== NO_EXPIRE && storage.expire < Date.now()) {
			delete storageValue[key];
		}
	}
	update(STORAGE_KEY, storageValue);
}

/**
 * 更新localStorage的expire
 * @param {String} key 数据名
 * @param {Number} expTime 过期时间
 */
function updateItemExpire(key, expTime) {
	clearExpired();
	var storage = storageValue[key];
	if (storage) {
		expTime = toInteger(expTime);
		expTime = expTime < 0 ? NO_EXPIRE : expTime;
		storage.expire = expTime === NO_EXPIRE ? NO_EXPIRE : Date.now() + expTime;
	}
	update(STORAGE_KEY, storageValue);
}

/**
 * @param {String} key
 * @param{String || Boolean || Number || Array || Object} value
 */
function updateItemValue(key, value) {
	clearExpired();
	var storage = storageValue[key];
	if (storage && canJSON(value)) {
		storage.value = value;
	}
	update(STORAGE_KEY, storageValue);
}

/**
 * @param {string} key 数据名
 */
function removeItem(key) {
	clearExpired();
	delete storageValue[key];
	update(STORAGE_KEY, storageValue);
}

function clear() {
	update(STORAGE_KEY, storageValue = {});
}

/**
 * @type {{length: *, clearExpired: clearExpired, setItem: setItem, getItem: (function(String): undefined), keepItemExpire: keepItemExpire, updateItemExpire: updateItemExpire, updateItemValue: updateItemValue, removeItem: removeItem, clear: clear}}
 */
var method = {
	get length() {
		return length();
	},
	clearExpired: clearExpired,
	setItem: setItem,
	getItem: getItem,
	keepItemExpire: keepItemExpire,
	updateItemExpire: updateItemExpire,
	updateItemValue: updateItemValue,
	removeItem: removeItem,
	clear: clear,
};
export default method;

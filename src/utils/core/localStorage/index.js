/**
 * Created by joey 2018/02/20
 */
import isPureObject from '../utils/isPureObject';
import isString from '../utils/isString';
import isNumber from '../utils/isNumber';
import isBoolean from '../utils/isBoolean';
import forOwn from '../utils/forOwn';

// 无限期
let NO_EXPIRE = 0;
// LocalStorage的key
let STORAGE_KEY = '__STORAGE__';
// 临时存储的变量
let storageValue = (function() {
	let result = JSON.parse(window.localStorage.getItem(STORAGE_KEY));
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
	return expTime === NO_EXPIRE || (isNumber(expTime) && isFinite(expTime) && expTime - Date.now() > 0);
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
	return Object.keys(storageValue).length;
}

/**
 * 清空过期的数据
 */
function clearExpired() {
	forOwn(storageValue, function(value, key) {
		if (!isPureObject(value) || !canJSON(value.value) || !isFresh(value.expire)) {
			delete storageValue[key];
		}
	});
	
	update(STORAGE_KEY, storageValue);
}

/**
 * 返回localStorage的所有值
 * @return {Object}
 */
function getAllItem() {
	clearExpired();
	return JSON.parse(JSON.stringify(storageValue));
}

/**
 * 设置localStorage
 * @param {String} key 名称
 * @param {String || Number ||  Boolean || Array || Object} value 设置的值
 * @param {Number} expTime 过期时间
 */
function setItem(key, value, expTime) {
	clearExpired();
	if (!canJSON(value)) {
		console.warn('设置的值不可序列化，请重新设置');
	} else {
		expTime = parseInt(expTime, 10);
		if (!isFinite(expTime) || expTime < 0) {
			expTime = NO_EXPIRE;
		}
		storageValue[key] = {
			value,
			expire: expTime === NO_EXPIRE ? NO_EXPIRE : expTime + Date.now(),
		};
		update(STORAGE_KEY, storageValue);
	}
}

/**
 * 获取localStorage某一项的值
 * @param {String} key 数据名
 * @returns {String || Boolean || Number || Array || Object}
 */
function getItem(key) {
	clearExpired();
	let storage = storageValue[key];
	if (storage) {
		return storage.value;
	}
}

/**
 * 续期localStorage的expire
 * @param {String} key 数据名
 * @param {Number} expTime 过期时间
 * @return {Boolean}
 */
function keepItem(key, expTime) {
	clearExpired();
	let storage = storageValue[key];
	expTime = parseInt(expTime, 10);
	if (storage && isFinite(expTime)) {
		storage.expire += expTime;
		if (storage.expire !== NO_EXPIRE && storage.expire < Date.now()) {
			delete storageValue[key];
		} else {
			update(STORAGE_KEY, storageValue);
		}
	}
}

/**
 * 更新localStorage的expire
 * @param {String} key 数据名
 * @param {Number} expTime 过期时间
 */
function updateItem(key, expTime) {
	clearExpired();
	let storage = storageValue[key];
	expTime = parseInt(expTime, 10);
	
	if (!isFinite(expTime) || expTime < 0) {
		expTime = NO_EXPIRE;
	}
	
	if (storage) {
		storage.expire = expTime === NO_EXPIRE ? NO_EXPIRE : Date.now() + expTime;
		update(STORAGE_KEY, storageValue);
	}
}

/**
 * 删除localStorage的某一项数据
 * @param {string} key 数据名
 */
function removeItem(key) {
	clearExpired();
	delete storageValue[key];
	update(STORAGE_KEY, storageValue);
}

/**
 * 清空本地数据
 */
function clear() {
	update(STORAGE_KEY, storageValue = {});
}

export default Object.defineProperties({}, {
	length: {
		get() {
			return length();
		},
		configurable: false,
	},
	clearExpired: {
		value: clearExpired,
		configurable: false,
	},
	getAllItem: {
		value: getAllItem,
		configurable: false,
	},
	setItem: {
		value: setItem,
		configurable: false,
	},
	getItem: {
		value: getItem,
		configurable: false,
	},
	keepItem: {
		value: keepItem,
		configurable: false,
	},
	updateItem: {
		value: updateItem,
		configurable: false,
	},
	removeItem: {
		value: removeItem,
		configurable: false,
	},
	clear: {
		value: clear,
		configurable: false,
	},
});


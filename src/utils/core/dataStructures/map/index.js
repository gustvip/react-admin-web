/**
 * Created by joey on 2018/8/20
 */
import findIndex from '../../utils/findIndex/index';
import isArray from '../../utils/isArray/index';

export default (function () {
	/**
	 * 长度
	 * @return  {number}
	 */
	function size () {
		return this.__data__.length;
	}
	
	/**
	 * 是否有此属性
	 * @param {*} property
	 * @return {boolean}
	 */
	function has (property) {
		return findIndex(this.__data__, function (value) {
			return value.key === property;
		}) !== -1;
	}
	
	/**
	 * 获取属性对应的值
	 * @param {*} property
	 * @return {undefined || *}
	 */
	function get (property) {
		var index = findIndex(this.__data__, function (value) {
			return value.key === property;
		});
		return index === -1 ? undefined : this.__data__[index].value;
	}
	
	/**
	 * 清楚
	 * @return {Map}
	 */
	function clear () {
		this.__data__ = [];
		return this;
	}
	
	/**
	 * 获取key组成的数组
	 * @return {*[]}
	 */
	function keys () {
		var keys = [];
		this.__data__.forEach(function (value) {
			keys.push(value.key);
		});
		return keys;
	}
	
	/**
	 * 获取value组成的数组
	 * @return {*[]}
	 */
	function values () {
		var values = [];
		this.__data__.forEach(function (value) {
			values.push(value.value);
		});
		return values;
	}
	
	/**
	 * 获取[key,value]组成的数组
	 * @return {[][]}
	 */
	function entries () {
		var entries = [];
		this.__data__.forEach(function (value) {
			entries.push([value.key, value.value]);
		});
		return entries;
	}
	
	/**
	 * 遍历
	 * @param {function} callback
	 * @return {Map}
	 */
	function forEach (callback) {
		this.__data__.forEach(function (value) {
			callback(value.value, value.key);
		});
		return this;
	}
	
	/**
	 * 设置值
	 * @param {*} property
	 * @param {*} value
	 * @return {Map}
	 */
	function setItem (property, value) {
		var index = findIndex(this.__data__, function (value) {
			return value.key === property;
		});
		if (index !== -1) {
			this.__data__[index].value = value;
		} else {
			this.__data__.push({key: property, value: value});
		}
		return this;
	}
	
	/**
	 * 清楚值
	 * @param {*} property
	 * @return {Map}
	 */
	function removeItem (property) {
		var index = findIndex(this.__data__, function (value) {
			return value.key === property;
		});
		if (index !== -1) {
			this.__data__.splice(index, 1);
		}
		return this;
	}
	
	Object.defineProperties(Map.prototype, {
		constructor: {
			value: Map,
			configuarable: false,
		},
		size: {
			get: size,
			configuarable: false,
		},
		has: {
			value: has,
			configuarable: false,
		},
		get: {
			value: get,
			configuarable: false,
		},
		
		set: {
			value: setItem,
			configuarable: false,
		},
		
		add: {
			value: setItem,
			configuarable: false,
		},
		
		remove: {
			value: removeItem,
			configuarable: false,
		},
		
		delete: {
			value: removeItem,
			configuarable: false,
		},
		
		clear: {
			value: clear,
			configuarable: false,
		},
		
		keys: {
			get: keys,
			configuarable: false,
		},
		
		values: {
			get: values,
			configuarable: false,
		},
		
		entries: {
			get: entries,
			configuarable: false,
		},
		
		forEach: {
			value: forEach,
			configuarable: false,
		},
	});
	
	function Map () {
		this.clear();
	}
	
	return function map (object) {
		var _map = new Map;
		if (object instanceof Map) {
			object.forEach(function (value, key) {
				_map.set(key, value);
			});
		} else if (isArray(object)) {
			var i = -1,
				n = object.length,
				o;
			while (++i < n && isArray(o = object[i])) {
				_map.set(o[0], o[1]);
			}
		}
		return _map;
	};
})();

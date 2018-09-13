/**
 * Created by joey on 2018/6/20
 */
import findIndex from "../utils/findIndex/index";
import isFunction from "../utils/isFunction/index";

export default (function() {
	/**
	 * 内部增加监听函数处理
	 * @param {String} type 类型
	 * @param {Function} callback 回掉函数
	 * @param {Boolean} isOnce 是否是一次性
	 * @returns {Object}
	 */
	function _addListener(type, callback, isOnce) {
		if (!isFunction(callback)) {
			throw new TypeError("callback must be function");
		}
		var row = this.__selfListeners__[type];
		
		var obj = {
			isOnce,
			callback,
		};
		row ? row.push(obj)
			: this.__selfListeners__[type] = [obj];
		return this;
	}
	
	/**
	 * 增加监听函数(可多次调用)
	 * @param {String} type 类型
	 * @param {Function} callback 回掉函数
	 * @returns {Object}
	 */
	function addListener(type, callback) {
		return _addListener.call(this, type, callback, false);
	}
	
	/**
	 * 增加监听函数(一次性)
	 * @param {String} type 类型
	 * @param {Function} callback 回掉函数
	 * @returns {Object}
	 */
	function addOnceListener(type, callback) {
		return _addListener.call(this, type, callback, true);
	}
	
	/**
	 * 移除所有监听的函数
	 * @returns {Object}
	 */
	function removeAllListener() {
		this.__selfListeners__ = {};
		return this;
	}
	
	/**
	 * 移除某一类的所有监听函数
	 * @returns {Object}
	 */
	function removeCategoryListener(type) {
		delete this.__selfListeners__[type];
		return this;
	}
	
	/**
	 * 移除监听的函数
	 * @param {String} type 类型
	 * @param {Function} callback 监听时的callback
	 * @returns {Object}
	 */
	function removeListener(type, callback) {
		var row = this.__selfListeners__[type];
		var index;
		if (row) {
			index = findIndex(row, (value) => {
				return value.callback === callback;
			});
			
			if (index !== -1) {
				row.splice(index, 1);
			}
			
			if (!row.length) {
				delete this.__selfListeners__[type];
			}
		}
		return this;
	}
	
	/**
	 * 促发监听的函数
	 * @param {String} type 监听时的类型
	 * @returns {Object}
	 */
	function trigger(type) {
		var row = this.__selfListeners__[type];
		var arg = arguments;
		if (row) {
			this.__selfListeners__[type] = row.filter((value) => {
				value.callback.apply(null, [].slice.call(arg, 1));
				return !value.isOnce;
			});
			if (this.__selfListeners__[type].length === 0) {
				delete this.__selfListeners__[type];
			}
		}
		return this;
	}
	
	Object.defineProperties(Emitter.prototype, {
		constructor: {
			value: Emitter,
			configuarable: false,
		},
		on: {
			value: addListener,
			configuarable: false,
		},
		once: {
			value: addOnceListener,
			configuarable: false,
		},
		addListener: {
			value: addListener,
			configuarable: false,
		},
		addOnceListener: {
			value: addOnceListener,
			configuarable: false,
		},
		removeAllListener: {
			value: removeAllListener,
			configuarable: false,
		},
		removeCategoryListener: {
			value: removeCategoryListener,
			configuarable: false,
		},
		removeListener: {
			value: removeListener,
			configuarable: false,
		},
		trigger: {
			value: trigger,
			configuarable: false,
		},
		emit: {
			value: trigger,
			configuarable: false,
		},
		dispatch: {
			value: trigger,
			configuarable: false,
		},
	});
	
	function Emitter() {
		this.removeAllListener();
	}
	
	return function emitter() {
		return new Emitter();
	};
}());

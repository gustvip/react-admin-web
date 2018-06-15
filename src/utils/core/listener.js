export default (function () {
	var listeners = {},
		id = -1
	
	/**
	 * 增加监听函数
	 * @param {String} type 类型
	 * @param {Function} callback 回掉函数
	 * @param {Boolean} [isOnce] 是否是一次性
	 * @returns {Number}
	 */
	function addListener (type, callback, isOnce) {
		if (!isFunction(callback)) {
			throw new TypeError('"callback" must be function')
		}
		type = String(type)
		isOnce = isNil(isOnce) ? false : !!type
		var row = listeners[type]
		if (row) {
			row.push({isOnce: isOnce, callback: callback, id: ++id})
			return id
		} else {
			listeners[type] = [{isOnce: isOnce, callback: callback, id: ++id}]
			return id
		}
	}
	
	/**
	 * 移除监听的函数
	 * @param {String} type 类型
	 * @param {Number} [id] 监听时的id
	 * @returns {undefined}
	 */
	function removeListener (type, id) {
		type = String(type)
		var row = listeners[type],
			index
		if (row) {
			if (isNumber(id)) {
				index = findIndex(row, function (value) {
					return value.id === callback
				})
				if (index === -1) {
					console.warn('do not found id or function')
				} else {
					row.splice(index, 1)
				}
			} else {
				delete  listeners[type]
			}
		}
	}
	
	/**
	 * 移除监听的函数
	 * @param {String} type 类型
	 * @returns {undefined}
	 */
	function trigger (type) {
		var arg = arguments,
			row = listeners[type]
		if (row && row.length) {
			row.forEach(function (value) {
				value.callback([].slice.call(arg, 1))
			})
			listeners[type] = row.filter(function (value) {
				return !value.isOnce
			})
		}
	}
	
	/**
	 * 是否为number
	 * @param {*} x
	 * @returns {boolean}
	 */
	function isNumber (x) {
		return typeof x === 'number'
	}
	
	/**
	 * 是否为函数
	 * @param {*} x
	 * @returns {boolean}
	 */
	function isFunction (x) {
		return typeof x === 'function'
	}
	
	/**
	 * 查找符合条件的索引
	 * @param {String || Array} x
	 * @param {Function} predicate
	 * @returns {number}
	 */
	function findIndex (x, predicate) {
		var len = x.length,
			thisArg = arguments[2],
			k = -1,
			kValue
		while (++k < len) {
			kValue = x[k]
			if (predicate.call(thisArg, kValue, k, x)) {
				return k
			}
		}
		return -1
	}
	
	/**
	 * 判断是否为null或者undefined
	 * @param {*} x
	 * @returns {boolean}
	 */
	function isNil (x) {
		return x == null
	}
	
	return Object.defineProperties({}, {
		on: {value: addListener, configurable: false},
		addListener: {value: addListener, configurable: false},
		off: {value: removeListener, configurable: false},
		removeListener: {value: removeListener, configurable: false},
		trigger: {value: trigger, configurable: false},
		dispatch: {value: trigger, configurable: false},
	})
})()

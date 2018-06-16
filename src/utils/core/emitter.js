export default (function () {
	var _listeners = {}
	
	/**
	 * 增加监听函数
	 * @param {String} type 类型
	 * @param {Function} callback 回掉函数
	 * @param {Boolean} [isOnce] 是否是一次性
	 * @returns {Undefined}
	 */
	function addListener (type, callback, isOnce) {
		if (!isFunction(callback)) {
			throw new TypeError('"callback" must be function')
		}
		isOnce = isNil(isOnce) ? false : !!type
		var row = _listeners[type]
		row ? row.push({isOnce: isOnce, callback: callback})
			: _listeners[type] = [{isOnce: isOnce, callback: callback}]
	}
	
	/**
	 * 移除监听的函数
	 * @param {String} [type] 类型
	 * @param {Function} [callback] 监听时的id
	 * @returns {Undefined}
	 */
	function removeListener (type, callback) {
		var row = _listeners[type],
			index
		
		if (isNil(type) && isNil(callback)) {
			_listeners = {}
		} else if (row && isNil(callback)) {
			delete _listeners[type]
		} else if (row && isFunction(callback)) {
			index = findIndex(row, function (value) {
				return value.callback === callback
			})
			if (index !== -1) {
				row.splice(index, 1)
			} else {
				console.warn('remove listener failed, because can not found callback')
			}
		} else {
			console.warn('remove listener failed,because' + 'the' + type + 'do not registry any event')
		}
	}
	
	/**
	 * 促发监听的函数
	 * @param {String} type 监听时的类型
	 * @returns {Undefined}
	 */
	function trigger (type) {
		var row = _listeners[type],
			arg = arguments
		if (row && row.length) {
			_listeners[type] = row.filter(function (value) {
				value.callback.apply(null, [].slice.call(arg, 1))
				return !value.isOnce
			})
		} else {
			console.warn('trigger event failed,because' + 'the' + type + 'do not registry any event')
		}
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
			k = -1,
			kValue
		while (++k < len) {
			kValue = x[k]
			if (predicate(kValue, k, x)) {
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
	
	return {
		on: addListener,
		addListener: addListener,
		off: removeListener,
		removeListener: removeListener,
		trigger: trigger,
		emit: trigger,
		dispatch: trigger,
	}
})()

export default (function () {
	var _listeners = {},
		_id = -1
	
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
		var row = _listeners[type]
		row ? row.push({isOnce: isOnce, callback: callback, id: ++_id})
			: _listeners[type] = [{isOnce: isOnce, callback: callback, id: ++_id}]
		return _id
	}
	
	/**
	 * 移除监听的函数
	 * @param {String || Number} type 类型
	 * @param {Number || Null || Undefined} [id] 监听时的id
	 * @returns {undefined}
	 */
	function removeListener (type, id) {
		var row = _listeners[type],
			index,
			key,
			keyValue
		if (isNil(id) && isNumber(type)) {
			for (key in _listeners) {
				if (_listeners.hasOwnProperty(key)) {
					keyValue = _listeners[key]
					index = findIndex(keyValue, function (value) {
						return value.id === type
					})
					if (index !== -1) {
						keyValue.splice(index, 1)
						break
					}
				}
			}
			if (index === -1) {
				console.warn('can not found id')
			}
		} else if (isString(type) && isNumber(id)) {
			index = findIndex(row, function (value) {
				return value.id === id
			})
			if (index === -1) {
				console.warn('can not found id')
			} else {
				row.splice(index, 1)
			}
		} else {
			delete _listeners[type]
		}
	}
	
	/**
	 * 促发监听的函数
	 * @param {String || Number} type 类型
	 * @param {*} [id] 监听时的id
	 * @returns {undefined}
	 */
	function trigger (type, id) {
		var arg = arguments,
			index,
			key,
			keyValue
		for (key in _listeners) {
			if (_listeners.hasOwnProperty(key)) {
				keyValue = _listeners[key]
				index = findIndex(keyValue, function (value) {
					return value.id === type
				})
				if (index !== -1) {
					keyValue[index].callback.apply(null, [].slice.call(arg, 1))
					if (keyValue[index].isOnce) {
						keyValue.splice(index, 1)
					}
					break
				}
			}
		}
		if (index === -1) {
			console.warn('can not found id')
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
	
	/**
	 * 判断是否为string
	 * @param {*} x
	 * @returns {boolean}
	 */
	function isString (x) {
		return typeof x === 'string'
	}
	
	return {
		on: addListener,
		addListener: addListener,
		off: removeListener,
		removeListener: removeListener,
		trigger: trigger,
		dispatch: trigger,
	}
})()

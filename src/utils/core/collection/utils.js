/**
 * Created by joey on 2018/8/20
 */
export default (function () {
	function isObject (object) {
		return typeof object === 'object' && typeof object != null;
	}
	
	function isFunction (x) {
		return typeof x === 'function';
	}
	
	function findIndex (x, predicate) {
		var len = x.length,
			k = -1,
			kValue;
		while (++k < len) {
			kValue = x[k];
			if (predicate(kValue, k, x)) return k;
		}
		return -1;
	}
	
	function forOwn (object, callBack) {
		if (isObject(object)) {
			for (var key in object) {
				if (object.hasOwnProperty(key)) {
					callBack(key, object[key]);
				}
			}
		}
	}
	
	function noop () {}
	
	return {
		isObject: isObject,
		findIndex: findIndex,
		isFunction: isFunction,
		noop: noop,
		forOwn: forOwn,
	};
})();

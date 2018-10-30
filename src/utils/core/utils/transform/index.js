/**
 * Created by joey on 2018/6/20
 */
import isFunction from '../isFunction';
import isObject from '../isObject';
import isArrayLike from '../isArrayLike';
import _arrayLikeForEach from '../aaa/_arrayLikeForEach/index';
import _objectForEach from '../aaa/_objectForEach';

/**
 * 迭代集合
 * @param {array | string | object} [data]
 * @param {function} [callback]
 * @param {*} [initValue]
 * @returns {*}
 */
export default function transform(data, callback, initValue) {
	if (isFunction(callback)) {
		var fn = (isArrayLike(data) && data.length > 0 && _arrayLikeForEach) || (isObject(data) && _objectForEach);
		fn && fn(data, function(value, index, arr) {
			callback(initValue, value, index, arr);
		});
	}
	return initValue;
}

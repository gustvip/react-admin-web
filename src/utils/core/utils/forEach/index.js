/**
 * Created by joey on 2018/6/20
 */
import isObject from '../isObject';
import isFunction from '../isFunction';
import isArrayLike from '../isArrayLike';
import _objectForEach from '../aaa/_objectForEach';
import _arrayLikeForEach from '../aaa/_arrayLikeForEach/index';

/**
 * 遍历集合
 * @param {object || array} [object]
 * @param {function} [callback]
 * @returns {undefined}
 */
export default function forEach(object, callback) {
	if (isFunction(callback)) {
		if (isArrayLike(object)) {
			_arrayLikeForEach(object, callback);
		} else if (isObject(object)) {
			_objectForEach(object, callback);
		}
	}
}

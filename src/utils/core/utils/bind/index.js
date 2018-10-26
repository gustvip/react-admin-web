/**
 * Created by joey on 2018/10/25
 */
import _baseSlice from '../aaa/_baseSlice';
import isFunction from '../isFunction';

/**
 * 绑定上下文
 * @param {Function} fn
 * @param {*} context
 * @return {function(): *}
 */
export default function bind(fn, context) {
	if (!isFunction(fn)) {
		throw new TypeError('fn must be function');
	}
	var arg = _baseSlice(arguments, 2);
	return function() {
		return fn.apply(context, arg.concat(_baseSlice(arguments)));
	};
}

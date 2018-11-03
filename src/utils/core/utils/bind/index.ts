/**
 * Created by joey on 2018/10/25
 */
import _baseSlice from "../aaa/_baseSlice/index";
import isFunction from "../isFunction/index";

export default function bind(fn: () => any, context: () => any): () => any {
	if (!isFunction(fn)) {
		throw new TypeError(fn + "must be function");
	}
	var arg = _baseSlice(arguments, 2);
	return function() {
		return fn.apply(context, arg.concat(_baseSlice(arguments)));
	};
}

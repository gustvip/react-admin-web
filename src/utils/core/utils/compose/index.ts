/**
 * Created by joey on 2018/6/20
 */
import _baseSlice from "../aaa/_baseSlice/index";
import _arrayLikeForEach from "../aaa/_arrayLikeForEach/index";
import reverse from "../reverse/index";
import isFunction from "../isFunction/index";
import identity from "../identity/index";
import isArray from "../isArray/index";

export default function compose(funs?: any): Function {
	funs = reverse(isArray(funs) ? funs : _baseSlice(arguments));
	_arrayLikeForEach(funs, function(fn) {
		if (!isFunction(fn)) {
			throw new TypeError("params must be function");
		}
	});
	
	if (funs.length === 0) {
		return identity;
	}
	
	return function() {
		var result = funs[0].apply(null, _baseSlice(arguments));
		var index = 0;
		while (++index < funs.length) {
			result = funs[index].call(null, result);
		}
		return result;
	};
}

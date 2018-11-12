/**
 * Created by joey on 2018/6/20
 */
import isArray from '../isArray/index';
import isFunction from '../isFunction/index';
import toInteger from '../toInteger/index';
import isUndefined from '../isUndefined/index';
import { arrayLikeCallbackType } from '../@types';

export default function find(x?: any, predicate?: arrayLikeCallbackType | any, fromIndex?: any): any {
	if (isArray(x) && isFunction(predicate) && x.length > 0) {
		var len = x.length;
		var kValue;
		fromIndex = isUndefined(fromIndex) ? 0 : toInteger(fromIndex);
		fromIndex = fromIndex < 0 ? Math.max(0, fromIndex + len) : fromIndex >= len ? 0 : fromIndex;
		while (fromIndex < len) {
			if (predicate(kValue = x[fromIndex], fromIndex, x)) {
				return x[fromIndex];
			}
			++fromIndex;
		}
	}
}

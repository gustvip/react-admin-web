/**
 * Created by joey on 2018/6/20
 */
import isArray from '../isArray/index';
import isFunction from '../isFunction/index';
import toInteger from '../toInteger/index';
import isUndefined from '../isUndefined/index';
import { arrayLikeCallbackType } from '../@types';

export default function findLast(x: any, predicate: arrayLikeCallbackType | any, fromIndex?: any): any {
	if (isArray(x) && isFunction(predicate) && x.length > 0) {
		var len = x.length;
		fromIndex = isUndefined(fromIndex) ? len - 1 : toInteger(fromIndex);
		fromIndex = fromIndex >= len ? Math.min(fromIndex - len, len - 1) : fromIndex < 0 ? len - 1 : fromIndex;
		var k = fromIndex;
		while (k) {
			if (predicate(x[k], k, x)) {
				return x[k];
			}
			--k;
		}
	}
}

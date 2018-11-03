/**
 * Created by joey on 2018/10/15
 */
import isFunction from '../isFunction/index';
import isArray from '../isArray/index';
import { arrayLikeCallbackType } from '../@types';

export default function every(data: any, callback: arrayLikeCallbackType | any): boolean {
	if (isFunction(callback) && isArray(data) && data.length > 0) {
		var i = -1;
		var k = data.length;
		while (++i < k) {
			if (!callback(data[i], i, data)) {
				return false;
			}
		}
	}
	return true;
}

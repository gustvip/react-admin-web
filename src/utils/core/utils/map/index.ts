/**
 * Created by joey on 2018/6/20
 */
import isFunction from '../isFunction/index';
import isArray from '../isArray/index';
import { arrayLikeCallbackType } from '../@types';

export default function map(data?: any, callback?: arrayLikeCallbackType | any): any[] {
	var s: any[] = [];
	if (isFunction(callback) && isArray(data)) {
		var i = -1;
		var k = data.length;
		while (++i < k) {
			s[i] = callback(data[i], i, data);
		}
	}
	return s;
}

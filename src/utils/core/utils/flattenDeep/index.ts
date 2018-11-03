/**
 * Created by joey on 2018/6/20
 */
import _arrayLikeForEach from '../aaa/_arrayLikeForEach/index';
import isArray from '../isArray/index';

export default function flattenDeep(data: any): any[] {
	var s: any[] = [];
	if (isArray(data)) {
		// @ts-ignore
		!(function fn(arr) {
			_arrayLikeForEach(arr, function(value) {
				if (isArray(value)) {
					fn(value);
				} else {
					s.push(value);
				}
			});
		})(data);
	}
	return s;
}

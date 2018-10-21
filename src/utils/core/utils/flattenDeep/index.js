/**
 * Created by joey on 2018/6/20
 */
import _arrayLikeForEach from '../aaa/_arrayLikeForEach';
import isArray from '../isArray';

/**
 * 展开数组
 * @param {array | *} [data]
 * @returns {array}
 */
export default function flattenDeep(data) {
	var i = -1;
	var s = [];
	if (isArray(data)) {
		!(function fn(arr) {
			_arrayLikeForEach(arr, function(value) {
				if (isArray(value)) {
					fn(value);
				} else {
					s[++i] = value;
				}
			});
		})(data);
	}
	return s;
}

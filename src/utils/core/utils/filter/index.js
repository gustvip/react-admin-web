/**
 * Created by joey on 2018/6/20
 */
import isFunction from '../isFunction';
import isArray from '../isArray';

/**
 * 筛选集合
 * @param {array} [data]
 * @param {function} [callback]
 * @returns {array}
 */
export default function filter(data, callback) {
	var s = [];
	if (isFunction(callback) && isArray(data) && data.length > 0) {
		var i = -1;
		var k = data.length;
		while (++i < k) {
			if (callback(data[i], i, data)) {
				s.push(data[i]);
			}
		}
	}
	return s;
}

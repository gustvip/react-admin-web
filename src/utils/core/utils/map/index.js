/**
 * Created by joey on 2018/6/20
 */
import isFunction from '../isFunction';
import isArray from '../isArray';

/**
 * 映射集合
 * @param {array | string} [data]
 * @param {function} [callback]
 * @returns {array}
 */
export default function map(data, callback) {
	var s = [];
	if (isFunction(callback) && isArray(data) && data.length > 0) {
		var i = -1;
		var k = data.length;
		while (++i < k) {
			s[i] = callback(data[i], i, data);
		}
	}
	return s;
}

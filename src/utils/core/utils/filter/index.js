/**
 * Created by joey on 2018/6/20
 */
import isFunction from "../isFunction";
import isArrayLike from "../isArrayLike";

/**
 * 筛选集合
 * @param {array | string} [data]
 * @param {function} [callback]
 * @returns {array}
 */
export default function filter(data, callback) {
	var s = [];
	if (isFunction(callback) && isArrayLike(data) && data.length > 0) {
		var i = -1;
		var j = -1;
		var k = data.length;
		while (++i < k) {
			if (callback(data[i], i, data)) {
				s[++j] = data[i];
			}
		}
	}
	return s;
}

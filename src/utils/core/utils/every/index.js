/**
 * Created by joey on 2018/10/15
 */
import isFunction from "../isFunction";
import isArray from "../isArray";

/**
 * 验证集合是否所有项符合
 * @param {array} [data]
 * @param {function} [callback]
 * @returns {boolean}
 */
export default function every(data, callback) {
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

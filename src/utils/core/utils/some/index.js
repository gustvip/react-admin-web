/**
 * Created by joey on 2018/6/20
 */
import isFunction from "../isFunction";
import isArray from "../isArray";

/**
 * 验证集合是否有某项符合
 * @param {array | string} [data]
 * @param {function} [callback]
 * @returns {boolean}
 */
export default function some(data, callback) {
	if (isFunction(callback) && isArray(data) && data.length > 0) {
		var i = -1;
		var k = data.length;
		while (++i < k) {
			if (callback(data[i], i, data)) {
				return true;
			}
		}
		return false;
	}
	return true;
}

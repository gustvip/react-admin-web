/**
 * Created by joey on 2018/6/20
 */
import isFunction from "../isFunction";
import isArrayLike from "../isArrayLike";

/**
 * 验证集合是否所有项符合
 * @param {array | string} [data]
 * @param {function} [callback]
 * @returns {boolean}
 */
export default function every(data, callback) {
	if (isFunction(callback) && isArrayLike(data) && data.length > 0) {
		var i = -1;
		var k = data.length;
		while (++i < k) {
			if (!callback(data[i], i, data)) {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
}

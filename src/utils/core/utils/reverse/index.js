/**
 * Created by joey on 2018/6/20
 */
import isArrayLike from "../isArrayLike";

/**
 * 反转类数组
 * @param {array | string} [data]
 * @returns {array}
 */
export default function reverse(data) {
	var s = [];
	if (isArrayLike(data) && data.length > 0) {
		var i = data.length;
		var j = -1;
		while (i--) {
			s[++j] = data[i];
		}
	}
	return s;
}

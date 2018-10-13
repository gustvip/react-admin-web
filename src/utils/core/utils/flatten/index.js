/**
 * Created by joey on 2018/6/20
 */
import _arrayLikeForEach from "../aaa/_arrayLikeForEach";
import isArray from "../isArray";

/**
 * 展开数组
 * @param {array | *} [data]
 * @returns {array}
 */
export default function flatten(data) {
	var i = -1;
	var s = [];
	if (isArray(data)) {
		_arrayLikeForEach(data, function(value) {
			if (isArray(value)) {
				_arrayLikeForEach(value, function(val) {
					s[++i] = val;
				});
			} else {
				s[++i] = value;
			}
		});
	}
	return s;
}

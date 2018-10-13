/**
 * Created by joey on 2018/6/20
 */
import forEach from "../forEach";

/**
 * 获取对象的key
 * @param {object || array} [data]
 * @returns {array}
 */
export default function keys(data) {
	var i = -1;
	var s = [];
	forEach(data, function(value, key) {
		s[++i] = key;
	});
	return s;
}

/**
 * Created by joey on 2018/6/20
 */
import forEach from "../forEach";

/**
 * 获取对象的value
 * @param {object || array} [data]
 * @returns {array}
 */
export default function values(data) {
	var i = -1;
	var s = [];
	forEach(data, function(value) {
		s[++i] = value;
	});
	return s;
}

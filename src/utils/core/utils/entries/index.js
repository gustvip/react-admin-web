/**
 * Created by joey on 2018/6/20
 */
import forEach from '../forEach';

/**
 * 获取对象的[key,value]
 * @param {object || array} [data]
 * @returns {array}
 */
export default function entries(data) {
	var i = -1;
	var s = [];
	forEach(data, function(value, key) {
		s[++i] = [key, value];
	});
	return s;
}

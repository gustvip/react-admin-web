/**
 * Created by joey on 2018/8/28
 */
import toInteger from '../toInteger';

/**
 * 转化为length
 * @param {*} x
 * @returns {number}
 */
export default function toLength(x) {
	var MAX_ARRAY_INDEX = 4294967295;
	x = toInteger(x);
	if (x < 0) {
		return 0;
	}
	if (x > MAX_ARRAY_INDEX) {
		return MAX_ARRAY_INDEX;
	}
	return x;
}

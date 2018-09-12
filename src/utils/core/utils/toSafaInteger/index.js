/**
 * Created by joey on 2018/8/28
 */
import toInteger from '../toInteger';

/**
 * 转化为安全数字
 * @param {*} x
 * @returns {number}
 */
export default function toSafeInteger(x) {
	x = toInteger(x);
	const MAX_SAFE_INTEGER = 9007199254740991;
	if (x < -MAX_SAFE_INTEGER) {
		return -MAX_SAFE_INTEGER;
	} if (x > MAX_SAFE_INTEGER) {
		return MAX_SAFE_INTEGER;
	}
	return x;
}

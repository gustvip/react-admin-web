/**
 * Created by joey on 2018/8/28
 */
import toInteger from "../toInteger";

/**
 * 转化为安全数字
 * @param {*} x
 * @returns {number}
 */
export default function toSafeInteger(x) {
	var MAX_SAFE_INTEGER = 9007199254740991;
	x = toInteger(x);
	if (x < -MAX_SAFE_INTEGER) {
		return -MAX_SAFE_INTEGER;
	}
	if (x > MAX_SAFE_INTEGER) {
		return MAX_SAFE_INTEGER;
	}
	return x;
}

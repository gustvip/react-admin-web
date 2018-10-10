/**
 * Created by joey on 2018/8/28
 */
import toNumber from "../toNumber";

/**
 * 转化为有限数字
 * @param {*} x
 * @returns {number}
 */
export default function toFinite(x) {
	var MAX_NUMBER = 1.7976931348623157e+308;
	x = toNumber(x);
	if (x !== x) {
		return 0;
	}
	if (x === Infinity) {
		return MAX_NUMBER;
	}
	if (x === -Infinity) {
		return -MAX_NUMBER;
	}
	return x;
}

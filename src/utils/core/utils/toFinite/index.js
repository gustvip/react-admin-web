/**
 * Created by joey on 2018/8/28
 */
import toNumber from "../toNumber";
import {MAX_NUMBER} from "../aaa/_constant/index";

/**
 * 转化为有限数字
 * @param {*} x
 * @returns {number}
 */
export default function toFinite(x) {
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

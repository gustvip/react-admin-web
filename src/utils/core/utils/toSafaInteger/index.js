/**
 * Created by joey on 2018/8/28
 */
import toInteger from "../toInteger";
import {MAX_SAFE_INTEGER} from "../aaa/_constant/index";

/**
 * 转化为安全数字
 * @param {*} x
 * @returns {number}
 */
export default function toSafeInteger(x) {
	x = toInteger(x);
	if (x < -MAX_SAFE_INTEGER) {
		return -MAX_SAFE_INTEGER;
	}
	if (x > MAX_SAFE_INTEGER) {
		return MAX_SAFE_INTEGER;
	}
	return x;
}

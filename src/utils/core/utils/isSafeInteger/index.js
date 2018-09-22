/**
 * Created by joey on 2018/6/20
 */
import isInteger from "../isInteger";
import _MathAbs from "../aaa/_MathAbs";
import {MAX_SAFE_INTEGER} from "../aaa/_constant/index";

/**
 * 是否为符合条件的整数
 * @param {*} x
 * @returns {boolean}
 */
export default function isSafeInteger(x) {
	return isInteger(x) && _MathAbs(x) <= MAX_SAFE_INTEGER;
}

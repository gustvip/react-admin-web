/**
 * Created by joey on 2018/6/20
 */
import isNumber from "../isNumber";
import {MAX_SAFE_INTEGER} from "../aaa/_constant/index";

/**
 * Checks if `value` is a valid array-like length
 * @param {*} x
 * @returns {boolean}
 */
export default function isLength(x) {
	return isNumber(x) && x > -1 && Math.floor(x) === x && x <= MAX_SAFE_INTEGER;
}

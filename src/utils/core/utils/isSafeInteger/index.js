/**
 * Created by joey on 2018/6/20
 */
import isInteger from "../isInteger";
import {MAX_SAFE_INTEGER} from "../constant/index";

/**
 * Checks if `value` is a valid array-like length
 * @param {*} x
 * @returns {boolean}
 */
export default function isSafeInteger(x) {
	return isInteger(x) && Math.abs(x) <= MAX_SAFE_INTEGER;
}

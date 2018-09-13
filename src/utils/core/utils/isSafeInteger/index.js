/**
 * Created by joey on 2018/6/20
 */
import isInteger from "../isInteger";

/**
 * Checks if `value` is a valid array-like length
 * @param {*} x
 * @returns {boolean}
 */
export default function isSafeInteger(x) {
	return isInteger(x) && Math.abs(x) <= 9007199254740991;
}

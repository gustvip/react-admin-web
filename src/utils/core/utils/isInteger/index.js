/**
 * Created by joey on 2018/6/20
 */
import isNumber from "../isNumber";

/**
 * Checks if `value` is a valid array-like length
 * @param {*} x
 * @returns {boolean}
 */
export default function isInteger(x) {
	return isNumber(x) && isFinite(x) && Math.floor(x) === x;
}

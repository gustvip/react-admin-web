/**
 * Created by joey on 2018/6/20
 */
import isFinite from "../isFinite";

/**
 * Checks if `value` is a valid array-like length
 * @param {*} x
 * @returns {boolean}
 */
export default function isInteger(x) {
	return isFinite(x) && Math.floor(x) === x;
}

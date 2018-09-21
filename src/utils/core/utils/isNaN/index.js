/**
 * Created by joey on 2018/6/20
 */
import isNumber from "../isNumber";

/**
 * 是否number && NaN
 * @param {*} x
 * @returns {boolean}
 */
export default function isNaN(x) {
	return isNumber(x) && x !== x;
}

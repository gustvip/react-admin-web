/**
 * Created by joey on 2018/6/20
 */
import isNumber from "../isNumber/index";

/**
 * 是否number && NaN
 * @param {*} x
 * @returns {boolean}
 */
export default function isNaN(x: any): boolean {
	return isNumber(x) && x !== x;
}

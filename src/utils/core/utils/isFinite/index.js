/**
 * Created by joey on 2018/6/20
 */
import isNumber from "../isNumber";

/**
 * 是否为有限的数字
 * @param {*} x
 * @returns {boolean}
 */
export default function IsFinite(x) {
	return isNumber(x) && isFinite(x);
}

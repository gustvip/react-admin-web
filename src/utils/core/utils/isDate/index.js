/**
 * Created by joey on 2018/8/25
 */
import getClassName from "../getClassName/index";

/**
 * 是否为date
 * @param {*} x
 * @returns {boolean}
 */
export default function isDate(x) {
	return getClassName(x) === "[object Date]";
}

/**
 * Created by joey on 2018/8/25
 */
import getClassName from "../getClassName/index";

/**
 * 是否为正则
 * @param {*} x
 * @returns {boolean}
 */
export default function isRegExp(x) {
	return getClassName(x) === "[object RegExp]";
}

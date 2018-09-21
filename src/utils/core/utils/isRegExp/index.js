/**
 * Created by joey on 2018/8/25
 */
import _getClassName from "../aaa/_getClassName/index";

/**
 * 是否为正则
 * @param {*} x
 * @returns {boolean}
 */
export default function isRegExp(x) {
	return _getClassName(x) === "[object RegExp]";
}

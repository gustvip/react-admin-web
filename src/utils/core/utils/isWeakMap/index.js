/**
 * Created by joey on 2018/8/25
 */
import _getClassName from "../aaa/_getClassName/index";

/**
 * 是否为WeakMap
 * @param {*} x
 * @returns {boolean}
 */
export default function isWeakMap(x) {
	return _getClassName(x) === "[object WeakMap]";
}

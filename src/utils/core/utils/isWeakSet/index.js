/**
 * Created by joey on 2018/8/25
 */
import _getClassName from "../aaa/_getClassName/index";

/**
 * 是否为WeakSet
 * @param {*} x
 * @returns {boolean}
 */
export default function isWeakSet(x) {
	return _getClassName(x) === "[object WeakSet]";
}

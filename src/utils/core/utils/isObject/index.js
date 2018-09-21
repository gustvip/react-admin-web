/**
 * Created by joey on 2018/6/20
 */
import _getClassName from "../aaa/_getClassName/index";

/**
 * 是否为对象 {}
 * @param {*} x
 * @returns {boolean}
 */
export default function isObject(x) {
	return _getClassName(x) === "[object Object]";
}

/**
 * Created by joey on 2018/8/25
 */
import _getClassName from "../aaa/_getClassName/index";

/**
 * 是否为纯的对象
 * @param {*} x
 * @returns {boolean}
 */
export default function isPureObject(x) {
	return _getClassName(x) === "[object Object]";
}

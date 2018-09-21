/**
 * Created by joey on 2018/8/25
 */
import _getClassName from "../aaa/_getClassName/index";

/**
 * 是否为date
 * @param {*} x
 * @returns {boolean}
 */
export default function isError(x) {
	return _getClassName(x) === "[object Error]";
}

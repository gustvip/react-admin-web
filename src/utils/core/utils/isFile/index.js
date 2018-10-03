/**
 * Created by joey on 2018/10/02
 */
import _getClassName from "../aaa/_getClassName/index";

/**
 * 是否为文件
 * @param {*} x
 * @returns {boolean}
 */
export default function isFile(x) {
	return _getClassName(x) === "[object File]";
}

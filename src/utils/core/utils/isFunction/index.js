/**
 * Created by joey on 2018/6/20
 */
import getClassName from "../getClassName/index";

/**
 * 是否为函数
 * @param {*} x
 * @returns {boolean}
 */
export default function isFunction(x) {
	var className = getClassName(x);
	return className === "[object Function]" || className === "[object AsyncFunction]" || className === "[object GeneratorFunction]" || className === "[object Proxy]";
}

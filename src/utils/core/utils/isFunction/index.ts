/**
 * Created by joey on 2018/6/20
 */
import _getClassName from "../_getClassName/index";

export default function isFunction(x?: any): boolean {
	var className = _getClassName(x);
	return className === "[object Function]" || className === "[object AsyncFunction]" || className === "[object GeneratorFunction]" || className === "[object Proxy]";
}

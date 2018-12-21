/**
 * Created by joey on 2018/8/25
 */
import _getClassName from "../_getClassName/index";

export default function isDate(x?: any): boolean {
	return _getClassName(x) === "[object Date]";
}

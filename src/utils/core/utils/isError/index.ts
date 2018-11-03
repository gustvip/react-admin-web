/**
 * Created by joey on 2018/8/25
 */
import _getClassName from "../aaa/_getClassName/index";

export default function isError(x: any): boolean {
	return _getClassName(x) === "[object Error]";
}

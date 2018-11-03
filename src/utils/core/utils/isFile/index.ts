/**
 * Created by joey on 2018/10/02
 */
import _getClassName from "../aaa/_getClassName/index";

export default function isFile(x: any): boolean {
	return _getClassName(x) === "[object File]";
}

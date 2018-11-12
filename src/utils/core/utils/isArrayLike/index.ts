/**
 * Created by joey on 2018/6/20
 */
import isNil from "../isNil/index";
import isFunction from "../isFunction/index";
import isLength from "../isLength/index";

export default function isArrayLike(x?: any): boolean {
	return !isNil(x) && !isFunction(x) && isLength(x.length);
}

/**
 * Created by joey on 2018/6/20
 */
import isArrayLike from "../isArrayLike/index";
import isObjectLike from "../isObjectLike/index";

export default function isArrayLikeObject(x?: any): boolean {
	return isObjectLike(x) && isArrayLike(x);
}

/**
 * Created by joey on 2018/6/20
 */
import isNull from "../isNull/index";

export default function isObjectLike(x?: any): boolean {
	return typeof x === "object" && !isNull(x);
}

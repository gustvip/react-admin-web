/**
 * Created by joey on 2018/6/20
 */
import isNumber from "../isNumber/index";

export default function isLength(x: any): boolean {
	return isNumber(x) && x > -1 && Math.floor(x) === x && x <= 4294967295;
}

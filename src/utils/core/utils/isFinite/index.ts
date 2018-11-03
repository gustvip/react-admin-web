/**
 * Created by joey on 2018/6/20
 */
import isNumber from "../isNumber/index";

export default function IsFinite(x: any): boolean {
	return isNumber(x) && isFinite(x);
}

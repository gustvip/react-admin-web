/**
 * Created by joey on 2018/6/20
 */
import isFinite from "../isFinite/index";

export default function isInteger(x?: any): boolean {
	return isFinite(x) && Math.floor(x) === x;
}

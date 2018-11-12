/**
 * Created by joey on 2018/8/28
 */
import toNumber from '../toNumber/index';

export default function toFinite(x?: any): number {
	var MAX_NUMBER = 1.7976931348623157e+308;
	x = toNumber(x);
	if (x !== x) {
		return 0;
	} else if (x === Infinity) {
		return MAX_NUMBER;
	} else if (x === -Infinity) {
		return -MAX_NUMBER;
	} else {
		return x;
	}
}

/**
 * Created by joey on 2018/6/20
 */
import isInteger from '../isInteger/index';

export default function isSafeInteger(x?: any): boolean {
	return isInteger(x) && Math.abs(x) <= 9007199254740991;
}

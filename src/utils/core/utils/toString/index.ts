/**
 * Created by joey on 2018/8/28
 */
import isNil from '../isNil/index';

export default function toString(x?: any): string {
	if (isNil(x)) {
		return '';
	}
	return String(x);
}

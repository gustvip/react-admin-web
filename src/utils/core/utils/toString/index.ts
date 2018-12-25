/**
 * Created by joey on 2018/8/28
 */

export default function toString(x?: any): string {
	if (x == null) {
		return '';
	}
	return String(x);
}

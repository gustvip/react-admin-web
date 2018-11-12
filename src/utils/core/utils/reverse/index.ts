/**
 * Created by joey on 2018/6/20
 */
import isArray from '../isArray/index';

export default function reverse(data?: any[] | any): any[] {
	var s: any[] = [];
	if (isArray(data) && data.length > 0) {
		var i = data.length;
		while (i--) {
			s.push(data[i]);
		}
	}
	return s;
}

/**
 * Created by joey on 2018/6/20
 */
import forEach from '../forEach/index';

export default function entries(data: any): any[] {
	var s: any[] = [];
	forEach(data, function(value, key) {
		s.push([key, value]);
	});
	return s;
}

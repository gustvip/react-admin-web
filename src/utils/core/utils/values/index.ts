/**
 * Created by joey on 2018/6/20
 */
import forEach from '../forEach/index';

export default function values(data?: any): any[] {
	var s: any[] = [];
	forEach(data, function(value) {
		s.push(value);
	});
	return s;
}

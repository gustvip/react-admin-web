/**
 * Created by joey on 2018/6/20
 */
import _arrayLikeForEach from '../aaa/_arrayLikeForEach/index';
import isArray from '../isArray/index';

export default function flatten(data?: any): any[] {
	var s: any[] = [];
	if (isArray(data)) {
		_arrayLikeForEach(data, function(value) {
			if (isArray(value)) {
				_arrayLikeForEach(value, function(val) {
					s.push(val);
				});
			} else {
				s.push(value);
			}
		});
	}
	return s;
}

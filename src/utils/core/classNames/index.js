import isArray from '../utils/isArray';
import isFinite from '../utils/isFinite';
import isString from '../utils/isString';
import isPureObject from '../utils/isPureObject';
import _objectForEach from '../utils/aaa/_objectForEach';
import _arrayLikeForEach from '../utils/aaa/_arrayLikeForEach';

function classNames() {
	var classCollections = [];
	_arrayLikeForEach(arguments, function(value) {
		if (isString(value) || isFinite(value)) {
			classCollections.push(value);
		} else if (isArray(value)) {
			var inner = classNames.apply(null, value);
			if (inner) {
				classCollections.push(inner);
			}
		} else if (isPureObject(value)) {
			_objectForEach(value, function(val, key) {
				if (val) {
					classCollections.push(key);
				}
			});
		}
	});
	
	return classCollections.join(' ');
}

export default classNames;

import isArray from '../utils/isArray';
import isFinite from '../utils/isFinite';
import isString from '../utils/isString';
import isPureObject from '../utils/isPureObject';
import _objectForEach from '../utils/aaa/_objectForEach';
import _arrayLikeForEach from '../utils/aaa/_arrayLikeForEach';

function classNames() {
	var classCollections = [];
	var i = -1;
	_arrayLikeForEach(arguments, function(value) {
		if (isString(value) || isFinite(value)) {
			classCollections[++i] = value;
		} else if (isArray(value)) {
			var inner = classNames.apply(null, value);
			if (inner) {
				classCollections[++i] = inner;
			}
		} else if (isPureObject(value)) {
			_objectForEach(value, function(val, key) {
				if (val) {
					classCollections[++i] = key;
				}
			});
		}
	});
	
	return classCollections.join(' ');
}

export default classNames;

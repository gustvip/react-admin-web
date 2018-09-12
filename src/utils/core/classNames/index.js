import isNumber from '../utils/isNumber';
import isString from '../utils/isString';
import isArray from '../utils/isArray';
import isObject from '../utils/isObject';
import forOwn from '../utils/forOwn';

function classNames() {
	const classCollections = [];
	const arg = arguments;
	let value;
	for (let index = 0; index < arg.length; index++) {
		value = arg[index];
		if (!value) {
			continue;
		} else if (isString(value) || isNumber(value)) {
			classCollections.push(value);
		} else if (isArray(value)) {
			const inner = classNames(...value);
			if (inner) {
				classCollections.push(inner);
			}
		} else if (isObject(value)) {
			forOwn(value, (val, key) => {
				if (val === true) {
					classCollections.push(key);
				}
			});
		}
	}

	return classCollections.join(' ');
}

export default classNames;

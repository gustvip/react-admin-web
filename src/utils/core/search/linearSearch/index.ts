import Comparator from '../../utils/comparator/index';
import {compareFunctionType} from '../../utils/@types';

export default function (array: any[], seekElement?: any, compareCallback?: Comparator | compareFunctionType): any[] {
	const comparator = compareCallback instanceof Comparator ? compareCallback : new Comparator(compareCallback);
	const result: any[] = [];
	array.forEach(function (value, index) {
		if (comparator.equal(value, seekElement)) {
			result.push(index);
		}
	});
	return result;
}

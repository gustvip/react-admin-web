import Comparator from '../../utils/comparator/index';
import {compareFunctionType} from '../../utils/@types';

export default function (array: any[], seekElement?: any, comparatorCallback?: compareFunctionType): any[] {
	var comparator = new Comparator(comparatorCallback);
	var result: any[] = [];
	array.forEach(function (value, index) {
		if (comparator.equal(value, seekElement)) {
			result.push(index);
		}
	});
	return result;
}

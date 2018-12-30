import swap from '../../utils/swap';
import Comparator from '../../utils/comparator';
import {compareFunctionType} from '../../utils/@types';

export default function (originalArray: any[], compareCallback?: compareFunctionType): any[] {
	const comparator = new Comparator(compareCallback);
	for (let i = 0; i < originalArray.length; ++i) {
		for (let j = 0; j < originalArray.length - i - 1; ++j) {
			if (comparator.greaterThan(originalArray[j], originalArray[j + 1])) {
				swap(originalArray, j, j + 1);
			}
		}
	}
	return originalArray;
}

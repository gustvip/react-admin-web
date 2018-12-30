import swap from '../../utils/swap';
import Comparator from '../../utils/comparator';
import {compareFunctionType} from '../../utils/@types';

export default function (originalArray: any[], compareCallback?: compareFunctionType): any[] {
	const comparator = new Comparator(compareCallback);
	let minIndex: null | number;
	for (let i = 0; i < originalArray.length - 1; ++i) {
		minIndex = i;
		for (let j = i + 1; j < originalArray.length; ++j) {
			if (comparator.greaterThan(originalArray[minIndex], originalArray[j])) {
				minIndex = j;
			}
		}
		if (i !== minIndex) {
			swap(originalArray, i, minIndex);
		}
	}
	return originalArray;
}

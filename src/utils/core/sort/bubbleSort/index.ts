import swap from '../../utils/swap';
import Comparator from '../../utils/comparator';
import {compareFunctionType} from '../../utils/@types';

export default function (originalArray: any[], compareCallback?: Comparator | compareFunctionType): any[] {
	const comparator = compareCallback instanceof Comparator ? compareCallback : new Comparator(compareCallback);
	let isSwap: boolean;
	for (let i = 0; i < originalArray.length; ++i) {
		isSwap = false;
		for (let j = 0; j < originalArray.length - i - 1; ++j) {
			if (comparator.greaterThan(originalArray[j], originalArray[j + 1])) {
				swap(originalArray, j, j + 1);
				isSwap = true;
			}
		}
		if (!isSwap) {
			break;
		}
	}
	return originalArray;
}

import Comparator from '../../utils/comparator/index';
import {compareFunctionType} from '../../utils/@types';

export default function binarySearch(sortedArray: any[], seekElement?: any, compareCallback?: Comparator | compareFunctionType): number {
	const comparator = compareCallback instanceof Comparator ? compareCallback : new Comparator(compareCallback);
	let startIndex = 0;
	let endIndex = sortedArray.length - 1;
	while (startIndex <= endIndex) {
		const middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
		if (comparator.equal(seekElement, sortedArray[middleIndex])) {
			return middleIndex;
		} else if (comparator.lessThanOrEqual(seekElement, sortedArray[middleIndex])) {
			endIndex = middleIndex - 1;
		} else {
			startIndex = middleIndex + 1;
		}
	}
	
	return -1;
}

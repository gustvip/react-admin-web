import Comparator from '../../utils/comparator/index';
import {compareFunctionType} from '../../utils/@types';

export default function binarySearch(sortedArray: any[], seekElement?: any, comparatorCallback?: compareFunctionType): number {
	var comparator = new Comparator(comparatorCallback);
	var startIndex = 0;
	var endIndex = sortedArray.length - 1;
	while (startIndex <= endIndex) {
		var middleIndex = startIndex + Math.floor((endIndex - startIndex) / 2);
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

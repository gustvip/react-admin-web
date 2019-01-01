import Comparator from '../../utils/comparator';
import InterfaceComparator from '../../utils/comparator/@types';
import {compareFunctionType} from '../../utils/@types';

export default function (originalArray: any[], compareCallback?: Comparator | compareFunctionType): any[] {
	const comparator = compareCallback instanceof Comparator ? compareCallback : new Comparator(compareCallback);
	return mergeSort(originalArray, comparator);
}

function mergeSort(originalArray: any[], comparator: InterfaceComparator): any[] {
	if (originalArray.length <= 1) {
		return originalArray;
	}
	var middleIndex = Math.floor(originalArray.length / 2);
	var leftArray = originalArray.slice(0, middleIndex);
	var rightArray = originalArray.slice(middleIndex, originalArray.length);
	
	return mergeSortedArrays(mergeSort(leftArray, comparator), mergeSort(rightArray, comparator), comparator);
}

function mergeSortedArrays(leftArray: any[], rightArray: any[], comparator: InterfaceComparator): any[] {
	var sortedArray: any[] = [];
	
	while (leftArray.length && rightArray.length) {
		var minimumElement = null;
		
		if (comparator.lessThanOrEqual(leftArray[0], rightArray[0])) {
			minimumElement = leftArray.shift();
		} else {
			minimumElement = rightArray.shift();
		}
		
		sortedArray.push(minimumElement);
	}
	
	if (leftArray.length) {
		sortedArray = sortedArray.concat(leftArray);
	} else {
		sortedArray = sortedArray.concat(rightArray);
	}
	
	return sortedArray;
}

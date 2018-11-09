import Comparator from '../../utils/comparator';
import { compareFunctionType } from '../../utils/@types';

export default function(originalArray: any[], compareCallback?: compareFunctionType): any[] {
	var comparator = new Comparator(compareCallback);
	return mergeSort(originalArray, comparator);
}

function mergeSort(originalArray: any[], comparator: any): any[] {
	if (originalArray.length <= 1) {
		return originalArray;
	}
	var middleIndex = Math.floor(originalArray.length / 2);
	var leftArray = originalArray.slice(0, middleIndex);
	var rightArray = originalArray.slice(middleIndex, originalArray.length);
	
	var leftSortedArray = mergeSort(leftArray, comparator);
	var rightSortedArray = mergeSort(rightArray, comparator);
	
	return mergeSortedArrays(leftSortedArray, rightSortedArray, comparator);
}

function mergeSortedArrays(leftArray: any[], rightArray: any[], comparator: any): any[] {
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
	}
	
	if (rightArray.length) {
		sortedArray = sortedArray.concat(rightArray);
	}
	
	return sortedArray;
}

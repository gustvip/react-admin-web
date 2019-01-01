import Comparator from '../../utils/comparator';
import InterfaceComparator from '../../utils/comparator/@types';
import {compareFunctionType} from '../../utils/@types';
import swap from "../../utils/swap";

export default function quickSortExchange(originalArray: any[], compareCallback?: Comparator | compareFunctionType): any[] {
	const comparator = compareCallback instanceof Comparator ? compareCallback : new Comparator(compareCallback);
	return quickSort(originalArray, 0, originalArray.length - 1, comparator);
}

function quickSort(originalArray: any[], left: number, right: number, comparator: InterfaceComparator): any[] {
	let index: number;
	if (originalArray.length > 1) {
		index = partition(originalArray, left, right, comparator);
		if (left < index - 1) {
			quickSort(originalArray, left, index - 1, comparator);
		}
		
		if (index < right) {
			quickSort(originalArray, index, right, comparator);
		}
	}
	return originalArray;
}

function partition(originalArray: any[], left: number, right: number, comparator: InterfaceComparator): number {
	let pivotElement = originalArray[Math.floor((left + right) / 2)];
	let i = left;
	let j = right;
	while (i < j) {
		while (comparator.lessThan(originalArray[i], pivotElement)) {
			i++;
		}
		while (comparator.greaterThan(originalArray[j], pivotElement)) {
			j--;
		}
		if (i <= j) {
			swap(originalArray, i, j);
			i++;
			j--;
		}
	}
	return i;
}

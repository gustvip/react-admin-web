import swap from '../../utils/swap';
import Comparator from '../../utils/comparator';
import {compareFunctionType} from '../../utils/@types';

export default function (originalArray: any[], compareCallback?: Comparator | compareFunctionType): any[] {
	const comparator = compareCallback instanceof Comparator ? compareCallback : new Comparator(compareCallback);
	let gap = Math.floor(originalArray.length / 2);
	
	while (gap > 0) {
		for (let i = 0; i < (originalArray.length - gap); i++) {
			let currentIndex = i;
			let gapShiftedIndex = i + gap;
			
			while (currentIndex >= 0) {
				if (comparator.lessThan(originalArray[gapShiftedIndex], originalArray[currentIndex])) {
					swap(originalArray, currentIndex, gapShiftedIndex);
				}
				
				gapShiftedIndex = currentIndex;
				currentIndex -= gap;
			}
		}
		
		gap = Math.floor(gap / 2);
	}
	
	return originalArray;
}

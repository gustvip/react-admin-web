import MinHeap from '../../dataStructures/heap/minHeap';
import { compareFunctionType } from '../../utils/@types';

export default function(originalArray: any[], compareCallback?: compareFunctionType): any[] {
	var sortedArray: any[] = [];
	var minHeap = new MinHeap(compareCallback);
	
	originalArray.forEach(function(value) {
		minHeap.add(value);
	});
	
	while (!minHeap.isEmpty()) {
		sortedArray.push(minHeap.poll());
	}
	
	return sortedArray;
}

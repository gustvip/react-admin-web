import MinHeap from '../../dataStructures/heap/minHeap';
import _arrayLikeForEach from '../../utils/aaa/_arrayLikeForEach';

/**
 * 堆排序
 * @param {Array} originalArray
 * @param {Function} [compareCallback]
 * @return {Array}
 */
export default function sort(originalArray, compareCallback) {
	var sortedArray = [];
	var minHeap = new MinHeap(compareCallback);
	
	_arrayLikeForEach(originalArray, function(value) {
		minHeap.add(value);
	});
	
	while (!minHeap.isEmpty()) {
		sortedArray.push(minHeap.poll());
	}
	
	return sortedArray;
}

import Heap from './heap';
import bind from '../../utils/bind';

function MaxHeap(comparatorFunction) {
	var minHeapInstance = new Heap(comparatorFunction);
	minHeapInstance.pairIsInCorrectOrder = bind(function(firstElement, secondElement) {
		return this.compare.greaterThanOrEqual(firstElement, secondElement);
	}, minHeapInstance);
	return minHeapInstance;
}

MaxHeap.Heap = Heap;
export default MaxHeap;

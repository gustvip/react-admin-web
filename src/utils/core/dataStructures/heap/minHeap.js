import Heap from './heap';
import bind from '../../utils/bind';

function MinHeap(comparatorFunction) {
	var minHeapInstance = new Heap(comparatorFunction);
	minHeapInstance.pairIsInCorrectOrder = bind(function(firstElement, secondElement) {
		return this.compare.lessThanOrEqual(firstElement, secondElement);
	}, minHeapInstance);
	return minHeapInstance;
}

MinHeap.Heap = Heap;
export default MinHeap;

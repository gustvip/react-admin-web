import Heap from './heap';
import inherit from '../../utils/inherit';

function MinHeap(comparatorFunction) {
	Heap.call(this, comparatorFunction);
}

inherit(MinHeap, Heap).prototype.pairIsInCorrectOrder = function(firstElement, secondElement) {
	return this.compare.lessThanOrEqual(firstElement, secondElement);
};
export default MinHeap;

import Heap from './heap';
import inherit from '../../utils/inherit/index';

function MaxHeap(comparatorFunction) {
	Heap.call(this, comparatorFunction);
}

inherit(MaxHeap, Heap).prototype.pairIsInCorrectOrder = function(firstElement, secondElement) {
	return this.compare.greaterThanOrEqual(firstElement, secondElement);
};
export default MaxHeap;

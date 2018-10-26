/**
 * Created by joey on 2018/10/25
 */
import Comparator from '../../utils/comparator';
import isUndefined from '../../utils/isUndefined';
import findIndex from '../../utils/findIndex';
import swap from '../../utils/swap';

/**
 * @constructs Heap
 * @param {Function} [comparatorFunction]
 */
function Heap(comparatorFunction) {
	this.heapContainer = [];
	this.compare = new Comparator(comparatorFunction);
}

/**
 * @param {number} parentIndex
 * @return {number}
 */
Heap.prototype.getLeftChildIndex = function getLeftChildIndex(parentIndex) {
	return 2 * parentIndex + 1;
};

/**
 * @param {number} parentIndex
 * @return {number}
 */
Heap.prototype.getRightChildIndex = function getRightChildIndex(parentIndex) {
	return 2 * parentIndex + 2;
};

/**
 * @param {number} childIndex
 * @return {number}
 */
Heap.prototype.getParentIndex = function getParentIndex(childIndex) {
	return Math.floor((childIndex - 1) / 2);
};

/**
 * @param {number} childIndex
 * @return {boolean}
 */
Heap.prototype.hasParent = function hasParent(childIndex) {
	return this.getParentIndex(childIndex) >= 0;
};

/**
 * @param {number} parentIndex
 * @return {number}
 */
Heap.prototype.hasLeftChild = function hasLeftChild(parentIndex) {
	return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
};

/**
 * @param {number} parentIndex
 * @return {number}
 */
Heap.prototype.hasRightChild = function hasRightChild(parentIndex) {
	return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
};

/**
 * @param {number} parentIndex
 * @return {*}
 */
Heap.prototype.leftChild = function leftChild(parentIndex) {
	return this.heapContainer[this.getLeftChildIndex(parentIndex)];
};

/**
 * @param {number} parentIndex
 * @return {*}
 */
Heap.prototype.rightChild = function rightChild(parentIndex) {
	return this.heapContainer[this.getRightChildIndex(parentIndex)];
};

/**
 * @param {number} childIndex
 * @return {*}
 */
Heap.prototype.parent = function parent(childIndex) {
	return this.heapContainer[this.getParentIndex(childIndex)];
};

/**
 * @param {number} indexOne
 * @param {number} indexTwo
 */
Heap.prototype.swap = function(indexOne, indexTwo) {
	swap(this.heapContainer, indexOne, indexTwo);
};

/**
 * @return {*}
 */
Heap.prototype.peek = function peek() {
	if (this.isEmpty()) {
		return undefined;
	}
	return this.heapContainer[0];
};

/**
 * @return {*}
 */
Heap.prototype.poll = function poll() {
	if (this.isEmpty()) {
		return null;
	} else if (this.heapContainer.length === 1) {
		return this.heapContainer.pop();
	} else {
		var item = this.heapContainer[0];
		this.heapContainer[0] = this.heapContainer.pop();
		this.heapifyDown();
		return item;
	}
};

/**
 * @param {*} item
 * @return {Heap}
 */
Heap.prototype.add = function add(item) {
	this.heapContainer.push(item);
	this.heapifyUp();
	return this;
};

/**
 * @param {*} item
 * @param {Comparator} [comparator]
 * @return {Heap}
 */
Heap.prototype.remove = function remove(item, comparator) {
	var removeIndex = this.findIndex(item, comparator);
	while (removeIndex !== -1) {
		if (removeIndex === this.heapContainer.length - 1) {
			this.heapContainer.pop();
			break;
		} else {
			this.heapContainer[removeIndex] = this.heapContainer.pop();
			if (this.hasLeftChild(removeIndex) && (!this.parent(removeIndex) || this.pairIsInCorrectOrder(this.parent(removeIndex), this.heapContainer[removeIndex]))) {
				this.heapifyDown(removeIndex);
			} else {
				this.heapifyUp(removeIndex);
			}
			removeIndex = this.findIndex(item, comparator, removeIndex);
		}
	}
	return this;
};

/**
 * @param {*} item
 * @param {Comparator} [comparator]
 * @param {*} [fromIndex]
 * @return {Number}
 */
Heap.prototype.findIndex = function find(item, comparator, fromIndex) {
	comparator = comparator || this.compare;
	return findIndex(this.heapContainer, function(value) {
		return comparator.equal(item, value);
	}, fromIndex);
};

/**
 * @return {boolean}
 */
Heap.prototype.isEmpty = function isEmpty() {
	return !this.heapContainer.length;
};

/**
 * @return {string}
 */
Heap.prototype.toString = function toString() {
	return this.heapContainer.toString();
};

/**
 * @param {number} [customStartIndex]
 */
Heap.prototype.heapifyUp = function heapifyUp(customStartIndex) {
	customStartIndex = isUndefined(customStartIndex) ? this.heapContainer.length - 1 : customStartIndex;
	while (this.hasParent(customStartIndex) && !this.pairIsInCorrectOrder(this.parent(customStartIndex), this.heapContainer[customStartIndex])) {
		this.swap(customStartIndex, this.getParentIndex(customStartIndex));
		customStartIndex = this.getParentIndex(customStartIndex);
	}
};

/**
 * @param {number} [customStartIndex]
 */
Heap.prototype.heapifyDown = function heapifyDown(customStartIndex) {
	customStartIndex = isUndefined(customStartIndex) ? 0 : customStartIndex;
	var nextIndex = null;
	while (this.hasLeftChild(customStartIndex)) {
		if (this.hasRightChild(customStartIndex) && this.pairIsInCorrectOrder(this.rightChild(customStartIndex), this.leftChild(customStartIndex))) {
			nextIndex = this.getRightChildIndex(customStartIndex);
		} else {
			nextIndex = this.getLeftChildIndex(customStartIndex);
		}
		
		if (this.pairIsInCorrectOrder(this.heapContainer[customStartIndex], this.heapContainer[nextIndex])) {
			break;
		} else {
			this.swap(customStartIndex, nextIndex);
			customStartIndex = nextIndex;
		}
	}
};

export default Heap;

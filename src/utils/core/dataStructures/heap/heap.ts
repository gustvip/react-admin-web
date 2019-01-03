/**
 * Created by joey on 2018/10/25
 */
import Comparator from '../../utils/comparator/index';
import swap from '../../utils/swap/index';
import {compareFunctionType} from '../../utils/@types';
import {InterfaceHeap} from './@types';

export default abstract class Heap implements InterfaceHeap {
	constructor(comparatorFunction?: Comparator | compareFunctionType) {
		this.heapContainer = [];
		this.compare = comparatorFunction instanceof Comparator ? comparatorFunction : new Comparator(comparatorFunction);
	}
	
	abstract pairIsInCorrectOrder(firstElement, secondElement): boolean
	
	public heapContainer;
	public compare;
	public fromArray(value) {
		value.forEach(val => this.add(val));
		return this;
	}
	
	public sort() {
		const sortArray: any[] = [];
		while (!this.isEmpty()) {
			sortArray.push(this.poll());
		}
		this.heapContainer = sortArray;
		return sortArray;
	}
	
	public getLeftChildIndex(parentIndex) {
		return 2 * parentIndex + 1;
	}
	
	public getRightChildIndex(parentIndex) {
		return 2 * parentIndex + 2;
	}
	
	public getParentIndex(childIndex) {
		return Math.floor((childIndex - 1) / 2);
	}
	
	public hasParent(childIndex) {
		const i = this.getParentIndex(childIndex);
		return i > -1 && i < this.heapContainer.length;
	}
	
	public hasLeftChild(parentIndex) {
		const i = this.getLeftChildIndex(parentIndex);
		return i > -1 && i < this.heapContainer.length;
	}
	
	public hasRightChild(parentIndex) {
		const i = this.getRightChildIndex(parentIndex);
		return i > -1 && i < this.heapContainer.length;
	}
	
	public leftChild(parentIndex) {
		return this.heapContainer[this.getLeftChildIndex(parentIndex)];
	}
	
	public rightChild(parentIndex) {
		return this.heapContainer[this.getRightChildIndex(parentIndex)];
	}
	
	public parent(childIndex) {
		return this.heapContainer[this.getParentIndex(childIndex)];
	}
	
	public peek() {
		return this.heapContainer[0];
	}
	
	public poll() {
		if (this.heapContainer.length <= 1) {
			return this.heapContainer.pop();
		} else {
			const item = this.heapContainer[0];
			this.heapContainer[0] = this.heapContainer.pop();
			this.down();
			return item;
		}
	}
	
	public add(item) {
		this.heapContainer.push(item);
		this.up();
		return this;
	}
	
	public findIndex(item, comparator = this.compare, fromIndex = 0) {
		return this.heapContainer.findIndex((value) => comparator.equal(item, value), fromIndex);
	}
	
	public isEmpty() {
		return this.heapContainer.length === 0;
	}
	
	public toString() {
		return this.heapContainer.toString();
	}
	
	public remove(item, comparator) {
		let removeIndex = this.findIndex(item, comparator);
		while (removeIndex !== -1) {
			if (removeIndex === this.heapContainer.length - 1) {
				this.heapContainer.pop();
				break;
			} else {
				this.heapContainer[removeIndex] = this.heapContainer.pop();
				if (this.hasLeftChild(removeIndex) && (!this.hasParent(removeIndex) || this.pairIsInCorrectOrder(this.parent(removeIndex), this.heapContainer[removeIndex]))) {
					this.down(removeIndex);
				} else {
					this.up(removeIndex);
				}
				removeIndex = this.findIndex(item, comparator);
			}
		}
		return this;
	}
	
	public up(customStartIndex = this.heapContainer.length - 1) {
		while (this.hasParent(customStartIndex) && !this.pairIsInCorrectOrder(this.parent(customStartIndex), this.heapContainer[customStartIndex])) {
			swap(this.heapContainer, customStartIndex, this.getParentIndex(customStartIndex));
			customStartIndex = this.getParentIndex(customStartIndex);
		}
		return this;
	}
	
	public down(customStartIndex = 0) {
		let nextIndex: null | number = null;
		while (this.hasLeftChild(customStartIndex)) {
			if (this.hasRightChild(customStartIndex) && this.pairIsInCorrectOrder(this.rightChild(customStartIndex), this.leftChild(customStartIndex))) {
				nextIndex = this.getRightChildIndex(customStartIndex);
			} else {
				nextIndex = this.getLeftChildIndex(customStartIndex);
			}
			
			if (this.pairIsInCorrectOrder(this.heapContainer[customStartIndex], this.heapContainer[nextIndex])) {
				break;
			} else {
				swap(this.heapContainer, customStartIndex, nextIndex);
				customStartIndex = nextIndex;
			}
		}
		return this;
	}
}

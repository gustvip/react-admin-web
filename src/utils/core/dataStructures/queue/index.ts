import DoubleLinkedList from '../doubleLinkedList/index';
import {InterfaceQueue} from './@types';
import {InterfaceDoubleLinkedList} from '../doubleLinkedList/@types';

export default class Queue implements InterfaceQueue {
	constructor() {
		this.doubleLinkedList = new DoubleLinkedList();
	}
	
	private doubleLinkedList: InterfaceDoubleLinkedList;
	
	public get size() {
		return this.doubleLinkedList.size;
	}
	
	public toString(callback) {
		return this.doubleLinkedList.toString(callback);
	};
	
	public dequeue() {
		var removedHead = this.doubleLinkedList.deleteHead();
		return removedHead ? removedHead.value : undefined;
	};
	
	public enqueue(value) {
		this.doubleLinkedList.append(value);
		return this;
	};
	
	public peek() {
		// @ts-ignore
		return this.isEmpty() ? undefined : this.doubleLinkedList.head.value;
	};
	
	public clear() {
		this.doubleLinkedList.clear();
		return this;
	};
	
	public has(value) {
		return this.doubleLinkedList.has(value);
	};
	
	public isEmpty() {
		return this.size === 0;
	};
}

import DoubleLinkedList from '../doubleLinkedList/index';
import {InterfaceDoubleLinkedList} from "../doubleLinkedList/@types";
import {InterfaceStack} from './@types';

export default class Stack implements InterfaceStack {
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
	
	public toArray() {
		var nodes: any[] = [];
		var tail = this.doubleLinkedList.tail;
		while (tail) {
			nodes.push(tail.value);
			tail = tail.previous;
		}
		return nodes;
	};
	
	public pop() {
		var removedTail = this.doubleLinkedList.deleteTail();
		return removedTail ? removedTail.value : undefined;
	};
	
	public push(value) {
		this.doubleLinkedList.append(value);
		return this;
	};
	
	public peek() {
		// @ts-ignore
		return this.isEmpty() ? undefined : this.doubleLinkedList.tail.value;
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

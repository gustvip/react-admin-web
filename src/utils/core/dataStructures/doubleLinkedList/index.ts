import DoubleLinkedListNode from './doubleLinkedListNode';
import Comparator from '../../utils/comparator/index';
import {compareFunctionType} from '../../utils/@types';
import {InterfaceDoubleLinkedList, InterfaceDoubleLinkedListNode} from './@types';

export default class DoubleLinkedList implements InterfaceDoubleLinkedList {
	constructor(comparatorFunction?: compareFunctionType) {
		this.head = null;
		this.tail = null;
		this.size = 0;
		this.compare = new Comparator(comparatorFunction);
	}
	
	public compare;
	public head;
	public tail;
	public size;
	
	public clear() {
		this.head = this.tail = null;
		this.size = 0;
		return this;
	};
	
	public toString(callback) {
		return this.toArray().map(node => node.toString(callback)).toString();
	};
	
	public toArray() {
		var nodes: InterfaceDoubleLinkedListNode[] = [];
		var currentNode = this.head;
		while (currentNode) {
			nodes.push(currentNode);
			currentNode = currentNode.next;
		}
		
		return nodes;
	};
	
	public fromArray(values) {
		values.forEach(value => this.append(value));
		return this;
	};
	
	public deleteHead() {
		var deletedHead = this.head;
		if (this.head === this.tail) {
			this.clear();
		} else {
			this.head = this.head.next;
			this.head.previous = null;
			--this.size;
		}
		
		return deletedHead;
	};
	
	public deleteTail() {
		var deletedTail = this.tail;
		if (this.head === this.tail) {
			this.clear();
		} else {
			this.tail = this.tail.previous;
			this.tail.next = null;
			--this.size;
		}
		
		return deletedTail;
	};
	
	public find(findParams) {
		var value = findParams.value;
		var callback = findParams.callback;
		var currentNode = this.head;
		
		while (currentNode) {
			if (callback && typeof callback === "function" && callback(currentNode.value)) {
				break;
			} else if (this.compare.equal(currentNode.value, value)) {
				break;
			}
			
			currentNode = currentNode.next;
		}
		
		return currentNode;
	};
	
	public delete(value) {
		var deletedNode = null;
		while (this.head && this.compare.equal(this.head.value, value)) {
			deletedNode = this.head;
			this.head = this.head.next;
			--this.size;
		}
		if (this.head) {
			this.head.previous = null;
		}
		
		var currentNode = this.head;
		if (currentNode) {
			while (currentNode.next) {
				if (this.compare.equal(currentNode.next.value, value)) {
					deletedNode = currentNode.next;
					if (currentNode.next.next) {
						currentNode.next.next.previous = currentNode;
					}
					currentNode.next = currentNode.next.next;
					--this.size;
				} else {
					currentNode = currentNode.next;
				}
			}
		}
		
		this.tail = currentNode;
		if (this.tail) {
			this.tail.next = null;
		}
		
		return deletedNode;
	};
	
	public append(value) {
		var newNode = new DoubleLinkedListNode(value, null, this.tail);
		
		if (this.isEmpty()) {
			this.head = this.tail = newNode;
		} else {
			this.tail = this.tail.next = newNode;
		}
		++this.size;
		
		return this;
	};
	
	public prepend(value) {
		var newNode = new DoubleLinkedListNode(value, this.head);
		if (this.isEmpty()) {
			this.head = this.tail = newNode;
		} else {
			this.head = this.head.previous = newNode;
		}
		++this.size;
		
		return this;
	};
	
	public reverse() {
		const nodes: any[] = [];
		while (!this.isEmpty()) {
			nodes.push(this.deleteTail().value);
		}
		this.fromArray(nodes);
		return this;
	};
	
	public has(value) {
		return !!this.find({value: value});
	};
	
	public isEmpty() {
		return this.size === 0;
	};
}

import LinkedListNode from './linkedListNode';
import Comparator from '../../utils/comparator/index';
import {compareFunctionType} from '../../utils/@types';
import {InterfaceLinkedList} from './@types';

export default class LinkedList implements InterfaceLinkedList {
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
		var nodes: any[] = [];
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
			--this.size;
		}
		return deletedHead;
	};
	
	public deleteTail() {
		var deletedTail = this.tail;
		var currentNode = this.head;
		if (this.head === this.tail) {
			this.clear();
		} else {
			while (currentNode.next) {
				if (!currentNode.next.next) {
					currentNode.next = null;
					break;
				} else {
					currentNode = currentNode.next;
				}
			}
			this.tail = currentNode;
			--this.size;
		}
		return deletedTail;
	};
	
	public find(findParams) {
		var value = findParams.value;
		var callback = findParams.callback;
		var currentNode = this.head;
		
		while (currentNode) {
			if (callback && typeof callback === 'function' && callback(currentNode.value)) {
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
		
		var currentNode = this.head;
		if (currentNode) {
			while (currentNode.next) {
				if (this.compare.equal(currentNode.next.value, value)) {
					deletedNode = currentNode.next;
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
		var newNode = new LinkedListNode(value);
		
		if (this.isEmpty()) {
			this.head = this.tail = newNode;
		} else {
			this.tail.next = this.tail = newNode;
		}
		++this.size;
		
		return this;
	};
	
	public prepend(value) {
		var newNode = new LinkedListNode(value, this.head);
		if (this.isEmpty()) {
			this.head = this.tail = newNode;
		} else {
			this.head = newNode;
		}
		++this.size;
		
		return this;
	};
	
	public has(value) {
		return !!this.find({value: value});
	};
	
	public isEmpty() {
		return this.size === 0;
	};
}

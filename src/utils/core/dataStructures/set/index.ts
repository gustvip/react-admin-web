/**
 * Created by joey on 2018/8/20
 */
import DoubleLinkedList from '../doubleLinkedList/index';
import {InterfaceSet} from './@types';
import {InterfaceDoubleLinkedList} from '../doubleLinkedList/@types';

export default class Set implements InterfaceSet {
	constructor(object?: any) {
		this.doubleLinkedList = new DoubleLinkedList();
		if (object instanceof Set) {
			object.forEach((value) => this.add(value));
		} else if (Array.isArray(object)) {
			object.forEach((value) => this.add(value));
		}
	}
	
	private doubleLinkedList: InterfaceDoubleLinkedList;
	
	public get size() {
		return this.doubleLinkedList.size;
	}
	
	public delete(value) {
		this.doubleLinkedList.delete(value);
		return this;
	};
	
	public add(value) {
		var oldNode = this.doubleLinkedList.find({value: value});
		if (oldNode) {
			oldNode.value = value;
		} else {
			this.doubleLinkedList.append(value);
		}
		return this;
	};
	
	public forEach(callback) {
		var head = this.doubleLinkedList.head;
		while (head) {
			callback(head.value, head.value);
			head = head.next;
		}
		return this;
	};
	
	public entries() {
		var entries: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			entries.push([head.value, head.value]);
			head = head.next;
		}
		return entries;
	};
	
	public values() {
		var values: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			values.push(head.value);
			head = head.next;
		}
		return values;
	};
	
	public clear() {
		this.doubleLinkedList.clear();
		return this;
	};
	
	public has(value) {
		return !!this.doubleLinkedList.find({value: value});
	};
}

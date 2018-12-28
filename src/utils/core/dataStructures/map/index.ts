/**
 * Created by joey on 2018/8/20
 */
import DoubleLinkedList from '../doubleLinkedList/index';
import {InterfaceMap} from './@types';

function compareFunction(a, b) {
	if (a.key === b.key) {
		return 0;
	}
	return a.key < b.key ? -1 : 1;
}

export default class Map implements InterfaceMap {
	constructor(object?: any) {
		this.doubleLinkedList = new DoubleLinkedList(compareFunction);
		if (object instanceof Map) {
			object.forEach((value, key) => this.set(key, value));
		} else if (Array.isArray(object)) {
			object.forEach((value) => {
				if (Array.isArray(value)) {
					this.set(value[0], value[1]);
				}
			});
		}
	}
	
	public doubleLinkedList;
	
	public get size() {
		return this.doubleLinkedList.size;
	}
	
	public delete(key) {
		this.doubleLinkedList.delete({key});
		return this;
	};
	
	public set(key, value) {
		var oldNode = this.doubleLinkedList.find({value: {key}});
		if (oldNode) {
			oldNode.value.value = value;
		} else {
			this.doubleLinkedList.append({key, value});
		}
		return this;
	};
	
	public forEach(callback) {
		var head = this.doubleLinkedList.head;
		while (head) {
			callback(head.value.value, head.value.key);
			head = head.next;
		}
		return this;
	};
	
	public entries() {
		var entries: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			entries.push([head.value.key, head.value.value]);
			head = head.next;
		}
		return entries;
	};
	
	public values() {
		var values: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			values.push(head.value.value);
			head = head.next;
		}
		return values;
	};
	
	public keys() {
		var keys: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			keys.push(head.value.key);
			head = head.next;
		}
		return keys;
	};
	
	public clear() {
		this.doubleLinkedList.clear();
		return this;
	};
	
	public get(key) {
		var result = this.doubleLinkedList.find({value: {key: key}});
		return result ? result.value.value : undefined;
	};
	
	public has(key) {
		return !!this.doubleLinkedList.find({value: {key: key}});
	};
}

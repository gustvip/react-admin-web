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
		const oldNode = this.doubleLinkedList.find({value: {key}});
		if (oldNode) {
			oldNode.value.value = value;
		} else {
			this.doubleLinkedList.append({key, value});
		}
		return this;
	};
	
	public forEach(callback) {
		this.doubleLinkedList.eachFromHead(node => callback(node.value.value, node.value.key));
		return this;
	};
	
	public entries() {
		const entries: any[] = [];
		this.doubleLinkedList.eachFromHead(node => entries.push([node.value.key, node.value.value]));
		return entries;
	};
	
	public values() {
		const values: any[] = [];
		this.doubleLinkedList.eachFromHead(node => values.push(node.value.value));
		return values;
	};
	
	public keys() {
		const keys: any[] = [];
		this.doubleLinkedList.eachFromHead(node => keys.push(node.value.key));
		return keys;
	};
	
	public clear() {
		this.doubleLinkedList.clear();
		return this;
	};
	
	public get(key) {
		const result = this.doubleLinkedList.find({value: {key: key}});
		return result ? result.value.value : undefined;
	};
	
	public has(key) {
		return !!this.doubleLinkedList.find({value: {key: key}});
	};
}

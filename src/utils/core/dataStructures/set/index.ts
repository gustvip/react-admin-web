/**
 * Created by joey on 2018/8/20
 */
import DoubleLinkedList from '../doubleLinkedList/index';
import {InterfaceSet} from './@types';

export default class Set implements InterfaceSet {
	constructor(object?: any) {
		this.doubleLinkedList = new DoubleLinkedList();
		if (object instanceof Set || Array.isArray(object)) {
			object.forEach((value) => this.add(value));
		}
	}
	
	public doubleLinkedList;
	
	public get size() {
		return this.doubleLinkedList.size;
	}
	
	public delete(value) {
		this.doubleLinkedList.delete(value);
		return this;
	};
	
	public add(value) {
		var oldNode = this.doubleLinkedList.find({value});
		if (oldNode) {
			oldNode.value = value;
		} else {
			this.doubleLinkedList.append(value);
		}
		return this;
	};
	
	public forEach(callback) {
		this.doubleLinkedList.eachFromHead(node => callback(node.value, node.value));
		return this;
	};
	
	public entries() {
		const entries: any[] = [];
		this.doubleLinkedList.eachFromHead(node => entries.push([node.value, node.value]));
		return entries;
	};
	
	public values() {
		const values: any[] = [];
		this.doubleLinkedList.eachFromHead(node => values.push(node.value));
		return values;
	};
	
	public clear() {
		this.doubleLinkedList.clear();
		return this;
	};
	
	public has(value) {
		return !!this.doubleLinkedList.find({value});
	};
}

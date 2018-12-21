/**
 * Created by joey on 2018/8/20
 */
import DoubleLinkedList from '../doubleLinkedList/index';

function compareFunction(a, b) {
	if (a.key === b.key) {
		return 0;
	}
	return a.key < b.key ? -1 : 1;
}

class Map {
	public doubleLinkedList: DoubleLinkedList;
	public size: number;
	
	constructor(object?: any) {
		var self = this;
		this.doubleLinkedList = new DoubleLinkedList(compareFunction);
		if (object instanceof Map) {
			object.forEach(function (value, key) {
				self.set(key, value);
			});
		} else if (Array.isArray(object)) {
			object.forEach(function (value) {
				if (Array.isArray(value)) {
					self.set(value[0], value[1]);
				}
			});
		}
		this.size = this.doubleLinkedList.size;
	}
	
	public delete(key?: any): this {
		this.doubleLinkedList.delete({key: key});
		this.size = this.doubleLinkedList.size;
		return this;
	};
	
	public set(key?: any, value?: any): this {
		var oldNode = this.doubleLinkedList.find({value: {key: key}});
		if (oldNode) {
			oldNode.value.value = value;
		} else {
			this.doubleLinkedList.append({
				key: key, value: value
			});
		}
		this.size = this.doubleLinkedList.size;
		return this;
	};
	
	public forEach(callback: (value?: any, key?: any) => any): this {
		var head = this.doubleLinkedList.head;
		while (head) {
			callback(head.value.value, head.value.key);
			head = head.next;
		}
		return this;
	};
	
	public entries(): any[] {
		var entries: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			entries.push([head.value.key, head.value.value]);
			head = head.next;
		}
		return entries;
	};
	
	public values(): any[] {
		var values: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			values.push(head.value.value);
			head = head.next;
		}
		return values;
	};
	
	public keys(): any[] {
		var keys: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			keys.push(head.value.key);
			head = head.next;
		}
		return keys;
	};
	
	public clear(): this {
		this.doubleLinkedList.clear();
		this.size = this.doubleLinkedList.size;
		return this;
	};
	
	public get(key?: any): any {
		var result = this.doubleLinkedList.find({value: {key: key}});
		return result ? result.value.value : undefined;
	};
	
	public has(key?: any): boolean {
		return !!this.doubleLinkedList.find({value: {key: key}});
	};
}

export default Map;

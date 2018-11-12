/**
 * Created by joey on 2018/8/20
 */
import DoubleLinkedList from '../doubleLinkedList/index';
import isArray from '../../utils/isArray/index';
import _arrayLikeForEach from '../../utils/aaa/_arrayLikeForEach/index';

class Set {
	public doubleLinkedList: DoubleLinkedList;
	public size: number;
	
	constructor(object?: any) {
		var self = this;
		this.doubleLinkedList = new DoubleLinkedList();
		if (object instanceof Set) {
			object.forEach(function(value) {
				self.add(value);
			});
		} else if (isArray(object)) {
			_arrayLikeForEach(object, function(value) {
				self.add(value);
			});
		}
		this.size = this.doubleLinkedList.size;
	}
	
	public delete(value?: any): this {
		this.doubleLinkedList.delete(value);
		this.size = this.doubleLinkedList.size;
		return this;
	};
	
	public add(value?: any): this {
		var oldNode = this.doubleLinkedList.find({ value: value });
		if (oldNode) {
			oldNode.value = value;
		} else {
			this.doubleLinkedList.append(value);
		}
		this.size = this.doubleLinkedList.size;
		return this;
	};
	
	public forEach(callback: (value?: any, key?: any) => any): this {
		var head = this.doubleLinkedList.head;
		while (head) {
			callback(head.value, head.value);
			head = head.next;
		}
		return this;
	};
	
	public entries(): any[] {
		var entries: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			entries.push([head.value, head.value]);
			head = head.next;
		}
		return entries;
	};
	
	public values(): any[] {
		var values: any[] = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			values.push(head.value);
			head = head.next;
		}
		return values;
	};
	
	public clear(): this {
		this.doubleLinkedList.clear();
		this.size = this.doubleLinkedList.size;
		return this;
	};
	
	public has(value?: any): boolean {
		return !!this.doubleLinkedList.find({ value: value });
	};
}

export default Set;


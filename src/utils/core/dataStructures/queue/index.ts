import DoubleLinkedList from '../doubleLinkedList/index';

class Queue {
	public doubleLinkedList: DoubleLinkedList;
	public size: number;
	
	constructor() {
		this.doubleLinkedList = new DoubleLinkedList();
		this.size = this.doubleLinkedList.size;
	}
	
	public toString(callback?: any): string {
		return this.doubleLinkedList.toString(callback);
	};
	
	public dequeue(): any {
		var removedHead = this.doubleLinkedList.deleteHead();
		this.size = this.doubleLinkedList.size;
		return removedHead ? removedHead.value : undefined;
	};
	
	public enqueue(value?: any): this {
		this.doubleLinkedList.append(value);
		this.size = this.doubleLinkedList.size;
		return this;
	};
	
	public peek(): any {
		return this.isEmpty() ? undefined : this.doubleLinkedList.head.value;
	};
	
	public clear(): this {
		this.doubleLinkedList.clear();
		this.size = this.doubleLinkedList.size;
		return this;
	};
	
	public has(value?: any): boolean {
		return this.doubleLinkedList.has(value);
	};
	
	public isEmpty(): boolean {
		return this.size === 0;
	};
}

export default Queue;

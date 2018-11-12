import DoubleLinkedList from '../doubleLinkedList/index';

class Stack {
	public doubleLinkedList: DoubleLinkedList;
	public size: number;
	
	constructor() {
		this.doubleLinkedList = new DoubleLinkedList();
		this.size = this.doubleLinkedList.size;
	}
	
	public toString(callback?: any): string {
		return this.doubleLinkedList.toString(callback);
	};
	
	public toArray(): any[] {
		var nodes: any[] = [];
		var tail = this.doubleLinkedList.tail;
		while (tail) {
			nodes.push(tail.value);
			tail = tail.previous;
		}
		return nodes;
	};
	
	public pop(): any {
		var removedTail = this.doubleLinkedList.deleteTail();
		this.size = this.doubleLinkedList.size;
		return removedTail ? removedTail.value : undefined;
	};
	
	public push(value?: any): this {
		this.doubleLinkedList.append(value);
		this.size = this.doubleLinkedList.size;
		return this;
	};
	
	public peek(): any {
		return this.isEmpty() ? undefined : this.doubleLinkedList.tail.value;
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

export default Stack;

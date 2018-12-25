
export default class DoubleLinkedListNode {
	public value;
	public next;
	public previous;
	
	constructor(value: any, next = null, previous = null) {
		this.value = value;
		this.next = next;
		this.previous = previous;
	}
	
	toString(callback?: any) {
		return typeof callback === 'function' ? callback(this.value) : String(this.value);
	}
}

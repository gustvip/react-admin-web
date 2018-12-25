import {InterfaceLinkedListNode} from './@types';

export default class LinkedListNode implements InterfaceLinkedListNode {
	public value;
	public next;
	
	constructor(value: any, next = null) {
		this.value = value;
		this.next = next;
	}
	
	toString(callback) {
		return typeof callback === 'function' ? callback(this.value) : String(this.value);
	}
}

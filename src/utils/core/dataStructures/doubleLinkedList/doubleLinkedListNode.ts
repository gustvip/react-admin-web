import {InterfaceDoubleLinkedListNode} from './@types';

export default class DoubleLinkedListNode implements InterfaceDoubleLinkedListNode {
	public value;
	public next;
	public previous;
	
	constructor(value: any, next = null, previous = null) {
		this.value = value;
		this.next = next;
		this.previous = previous;
	}
	
	toString(callback) {
		return typeof callback === 'function' ? callback(this.value) : String(this.value);
	}
}

import {LinkedListNodeInterface} from './@types';

export default class LinkedListNode implements LinkedListNodeInterface {
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

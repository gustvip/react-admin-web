import isFunction from '../../utils/isFunction/index';
import isUndefined from '../../utils/isUndefined/index';

class LinkedListNode {
	public value: any;
	public next: any;
	
	constructor(value: any, next?: any) {
		this.value = value;
		this.next = isUndefined(next) ? null : next;
	}
	
	toString(callback?: any) {
		return isFunction(callback) ? callback(this.value) : String(this.value);
	}
}

export default LinkedListNode;


import isFunction from '../../utils/isFunction/index';
import isUndefined from '../../utils/isUndefined/index';

class DoubleLinkedListNode {
	public value;
	public next;
	public previous;
	
	constructor(value: any, next?: any, previous?: any) {
		this.value = value;
		this.next = isUndefined(next) ? null : next;
		this.previous = isUndefined(previous) ? null : previous;
	}
	
	toString(callback?: any) {
		return isFunction(callback) ? callback(this.value) : String(this.value);
	}
}

export default DoubleLinkedListNode;


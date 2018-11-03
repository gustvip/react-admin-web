import isFunction from '../../utils/isFunction/index';
import isUndefined from '../../utils/isUndefined/index';

function LinkedListNode(value, next) {
	this.value = value;
	this.next = isUndefined(next) ? null : next;
}

LinkedListNode.prototype.toString = function toString(callback) {
	return isFunction(callback) ? callback(this.value) : String(this.value);
};

export default function linkedListNode(value, next) {
	return new LinkedListNode(value, next);
}


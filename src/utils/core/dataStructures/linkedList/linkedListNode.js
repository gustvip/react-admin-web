import isFunction from "../../utils/isFunction";
import isUndefined from "../../utils/isUndefined";

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


import isFunction from "../../utils/isFunction";
import isUndefined from "../../utils/isUndefined";

function DoubleLinkedListNode(value, next, previous) {
	this.value = value;
	this.next = isUndefined(next) ? null : next;
	this.previous = isUndefined(previous) ? null : previous;
}

/**
 * @param {function} [callback]
 * @return {string}
 */
DoubleLinkedListNode.prototype.toString = function toString(callback) {
	return isFunction(callback) ? callback(this.value) : String(this.value);
};

export default function doubleLinkedListNode(value, next, previous) {
	return new DoubleLinkedListNode(value, next, previous);
}


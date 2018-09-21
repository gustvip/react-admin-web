import isFunction from "../../utils/isFunction";
import isUndefined from "../../utils/isUndefined";

function toString(callback) {
	return isFunction(callback) ? callback(this.value) : String(this.value);
}

Object.defineProperties(LinkedListNode.prototype, {
	constructor: {
		value: LinkedListNode,
		configuarable: false,
	},
	toString: {
		value: toString,
		configuarable: false,
	},
});

function LinkedListNode(value, next) {
	this.value = value;
	this.next = isUndefined(next) ? null : next;
}

export default function linkedListNode(value, next) {
	return new LinkedListNode(value, next);
}


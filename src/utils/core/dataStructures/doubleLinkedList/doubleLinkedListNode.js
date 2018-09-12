import isFunction from '../../utils/isFunction';
import isUndefined from '../../utils/isUndefined';

export default (function () {
	function toString(callback) {
		return isFunction(callback) ? callback(this.value) : String(this.value);
	}

	Object.defineProperties(DoubleLinkedListNode.prototype, {
		constructor: {
			value: DoubleLinkedListNode,
			configuarable: false,
		},
		toString: {
			value: toString,
			configuarable: false,
		},
	});

	function DoubleLinkedListNode(value, next, previous) {
		this.value = value;
		this.next = isUndefined(next) ? null : next;
		this.previous = isUndefined(previous) ? null : previous;
	}

	return function doubleLinkedListNode(value, next, previous) {
		return new DoubleLinkedListNode(value, next, previous);
	};
}());

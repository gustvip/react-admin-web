import LinkedList from '../linkedList';

export default (function () {
	'use strict';
	
	/**
	 * @return {boolean}
	 */
	function isEmpty () {
		return this.linkedList.isEmpty();
	}
	
	/**
	 * @return {boolean}
	 */
	function has (value) {
		return this.linkedList.has(value);
	}
	
	/**
	 * 清空栈
	 * @return {Stack}
	 */
	function clear () {
		this.linkedList.clear();
		return this;
	}
	
	/**
	 * @return {*}
	 */
	function peek () {
		return this.isEmpty() ? null : this.linkedList.tail.value;
	}
	
	/**
	 * @param {*} value
	 */
	function push (value) {
		this.linkedList.append(value);
	}
	
	/**
	 * @return {*}
	 */
	function pop () {
		var removedTail = this.linkedList.deleteTail();
		return removedTail ? removedTail.value : null;
	}
	
	/**
	 * @return {*[]}
	 */
	function toArray () {
		return this.linkedList.toArray().map(function (linkedListNode) {
			return linkedListNode.value;
		}).reverse();
	}
	
	/**
	 * @param {function} [callback]
	 * @return {string}
	 */
	function toString (callback) {
		return this.linkedList.toString(callback);
	}
	
	Object.defineProperties(Stack.prototype, {
		constructor: {
			value: Stack,
			configuarable: false,
		},
		isEmpty: {
			value: isEmpty,
			configuarable: false,
		},
		has: {
			value: has,
			configuarable: false,
		},
		clear: {
			value: clear,
			configuarable: false,
		},
		peek: {
			value: peek,
			configuarable: false,
		},
		push: {
			value: push,
			configuarable: false,
		},
		pop: {
			value: pop,
			configuarable: false,
		},
		toArray: {
			value: toArray,
			configuarable: false,
		},
		toString: {
			value: toString,
			configuarable: false,
		},
	});
	
	function Stack () {
		this.linkedList = new LinkedList();
	}
	
	return function stack () {
		return new Stack;
	};
})();

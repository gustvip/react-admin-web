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
	 * 清空队列
	 * @return {LinkedList}
	 */
	function clear () {
		this.linkedList.clear();
		return this;
	}
	
	/**
	 * @return {*}
	 */
	function peek () {
		return this.isEmpty() ? null : this.linkedList.head.value;
	}
	
	/**
	 * @param {*} value
	 */
	function enqueue (value) {
		this.linkedList.append(value);
	}
	
	/**
	 * @return {*}
	 */
	function dequeue () {
		var removedHead = this.linkedList.deleteHead();
		return removedHead ? removedHead.value : null;
	}
	
	/**
	 * @param [callback]
	 * @return {string}
	 */
	function toString (callback) {
		return this.linkedList.toString(callback);
	}
	
	Object.defineProperties(Queue.prototype, {
		constructor: {
			value: Queue,
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
		enqueue: {
			value: enqueue,
			configuarable: false,
		},
		dequeue: {
			value: dequeue,
			configuarable: false,
		},
		toString: {
			value: toString,
			configuarable: false,
		},
	});
	
	function Queue () {
		this.linkedList = new LinkedList();
	}
	
	return function queue () {
		return new Queue;
	};
})();

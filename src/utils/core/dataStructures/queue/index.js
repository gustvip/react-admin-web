import DoubleLinkedList from '../doubleLinkedList';

export default (function() {
	/**
	 * @return {boolean}
	 */
	function isEmpty() {
		return this.doubleLinkedList.isEmpty();
	}
	
	/**
	 * @return {boolean}
	 */
	function has(value) {
		return this.doubleLinkedList.has(value);
	}
	
	/**
	 * 清空队列
	 * @return {Queue}
	 */
	function clear() {
		this.doubleLinkedList.clear();
		return this;
	}
	
	/**
	 * @return {*}
	 */
	function peek() {
		return this.isEmpty() ? undefined : this.doubleLinkedList.head.value;
	}
	
	/**
	 * @param {*} value
	 */
	function enqueue(value) {
		this.doubleLinkedList.append(value);
	}
	
	/**
	 * @return {*}
	 */
	function dequeue() {
		var removedHead = this.doubleLinkedList.deleteHead();
		return removedHead ? removedHead.value : null;
	}
	
	/**
	 * @param [callback]
	 * @return {string}
	 */
	function toString(callback) {
		return this.doubleLinkedList.toString(callback);
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
	
	function Queue() {
		this.doubleLinkedList = new DoubleLinkedList();
	}
	
	return function queue() {
		return new Queue();
	};
}());

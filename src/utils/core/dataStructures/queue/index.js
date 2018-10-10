import DoubleLinkedList from "../doubleLinkedList";

function Queue() {
	this.doubleLinkedList = new DoubleLinkedList();
}

Object.defineProperty(Queue.prototype, "size", {
	get: function() {
		return this.doubleLinkedList.size;
	},
	configurable: false,
});

/**
 * @return {boolean}
 */
Queue.prototype.isEmpty = function isEmpty() {
	return this.size === 0;
};

/**
 * @return {boolean}
 */
Queue.prototype.has = function has(value) {
	return this.doubleLinkedList.has(value);
};

/**
 * 清空队列
 * @return {Queue}
 */
Queue.prototype.clear = function clear() {
	this.doubleLinkedList.clear();
	return this;
};

/**
 * @return {*}
 */
Queue.prototype.peek = function peek() {
	return this.isEmpty() ? undefined : this.doubleLinkedList.head.value;
};

/**
 * @param {*} value
 */
Queue.prototype.enqueue = function enqueue(value) {
	this.doubleLinkedList.append(value);
};

/**
 * @return {*}
 */
Queue.prototype.dequeue = function dequeue() {
	var removedHead = this.doubleLinkedList.deleteHead();
	return removedHead ? removedHead.value : null;
};

/**
 * @param [callback]
 * @return {string}
 */
Queue.prototype.toString = function toString(callback) {
	return this.doubleLinkedList.toString(callback);
};

function queue() {
	return new Queue();
}

queue.Queue = Queue;
export default queue;

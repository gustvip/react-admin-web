import DoubleLinkedList from "../doubleLinkedList";

function Stack() {
	this.doubleLinkedList = new DoubleLinkedList();
}

Object.defineProperty(Stack.prototype, "size", {
	get: function() {
		return this.doubleLinkedList.size;
	},
	configurable: false,
});

/**
 * @return {boolean}
 */
Stack.prototype.isEmpty = function isEmpty() {
	return this.size === 0;
};

/**
 * @return {boolean}
 */
Stack.prototype.has = function has(value) {
	return this.doubleLinkedList.has(value);
};

/**
 * 清空栈
 * @return {Stack}
 */
Stack.prototype.clear = function clear() {
	this.doubleLinkedList.clear();
	return this;
};

/**
 * @return {*}
 */
Stack.prototype.peek = function peek() {
	return this.isEmpty() ? undefined : this.doubleLinkedList.tail.value;
};

/**
 * @param {Stack} value
 */
Stack.prototype.push = function push(value) {
	this.doubleLinkedList.append(value);
	return this;
};

/**
 * @return {*}
 */
Stack.prototype.pop = function pop() {
	var removedTail = this.doubleLinkedList.deleteTail();
	return removedTail ? removedTail.value : null;
};

/**
 * @return {*[]}
 */
Stack.prototype.toArray = function toArray() {
	var index = -1;
	var nodes = new Array(this.size);
	var tail = this.doubleLinkedList.tail;
	while (tail) {
		nodes[++index] = tail.value;
		tail = tail.previous;
	}
	return nodes;
};

/**
 * @param {function} [callback]
 * @return {string}
 */
Stack.prototype.toString = function toString(callback) {
	return this.doubleLinkedList.toString(callback);
};

function stack() {
	return new Stack();
}

stack.Stack = Stack;

export default stack;

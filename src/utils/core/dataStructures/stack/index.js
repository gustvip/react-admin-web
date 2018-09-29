import DoubleLinkedList from "../doubleLinkedList";

/**
 * 长度
 * @return  {number}
 */
function size() {
	return this.doubleLinkedList.size;
}

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
 * 清空栈
 * @return {Stack}
 */
function clear() {
	this.doubleLinkedList.clear();
	return this;
}

/**
 * @return {*}
 */
function peek() {
	return this.isEmpty() ? undefined : this.doubleLinkedList.tail.value;
}

/**
 * @param {*} value
 */
function push(value) {
	this.doubleLinkedList.append(value);
}

/**
 * @return {*}
 */
function pop() {
	let removedTail = this.doubleLinkedList.deleteTail();
	return removedTail ? removedTail.value : null;
}

/**
 * @return {*[]}
 */
function toArray() {
	let index = -1;
	let nodes = new Array(this.size);
	let tail = this.doubleLinkedList.tail;
	while (tail) {
		nodes[++index] = tail.value;
		tail = tail.previous;
	}
	return nodes;
}

/**
 * @param {function} [callback]
 * @return {string}
 */
function toString(callback) {
	return this.doubleLinkedList.toString(callback);
}

Object.defineProperties(Stack.prototype, {
	constructor: {
		value: Stack,
		configuarable: false,
	},
	size: {
		get: size,
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

function Stack() {
	this.doubleLinkedList = new DoubleLinkedList();
}

export default function stack() {
	return new Stack();
}

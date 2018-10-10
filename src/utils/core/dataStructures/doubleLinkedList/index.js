import DoubleLinkedListNode from "./doubleLinkedListNode";
import Comparator from "../../utils/comparator";
import isFunction from "../../utils/isFunction";
import isUndefined from "../../utils/isUndefined";
import isObject from "../../utils/isObject";

/**
 * 是否为空
 * @return {boolean}
 */
DoubleLinkedList.prototype.isEmpty = function isEmpty() {
	return this.size === 0;
};

/**
 * 是否有此值
 * @return {boolean}
 */
DoubleLinkedList.prototype.has = function has(value) {
	return !!this.find({value: value});
};

/**
 * 清空链表
 * @return {DoubleLinkedList}
 */
DoubleLinkedList.prototype.clear = function clear() {
	this.head = this.tail = null;
	this.size = 0;
	return this;
};

/**
 * 向前添加
 * @param {*} value
 * @return {DoubleLinkedList}
 */
DoubleLinkedList.prototype.prepend = function prepend(value) {
	// Make new node to be a head.
	var newNode = new DoubleLinkedListNode(value, this.head);
	// If there is no head yet let's make new node a head.
	if (this.isEmpty()) {
		this.head = this.tail = newNode;
	} else {
		this.head = this.head.previous = newNode;
	}
	++this.size;
	
	return this;
};

/**
 * 向后添加
 * @param {*} value
 * @return {DoubleLinkedList}
 */
DoubleLinkedList.prototype.append = function append(value) {
	var newNode = new DoubleLinkedListNode(value, null, this.tail);
	
	// If there is no head yet let's make new node a head.
	if (this.isEmpty()) {
		this.head = this.tail = newNode;
	} else {
		this.tail = this.tail.next = newNode;
	}
	++this.size;
	
	return this;
};

/**
 * 删除值
 * @param {*} value
 * @return {DoubleLinkedListNode | null}
 */
DoubleLinkedList.prototype.delete = function _delete(value) {
	var deletedNode = null;
	while (this.head && this.compare.equal(this.head.value, value)) {
		deletedNode = this.head;
		this.head = this.head.next;
		--this.size;
	}
	if (this.head) {
		this.head.previous = null;
	}
	
	var currentNode = this.head;
	if (currentNode) {
		while (currentNode.next) {
			if (this.compare.equal(currentNode.next.value, value)) {
				deletedNode = currentNode.next;
				if (currentNode.next.next) {
					currentNode.next.next.previous = currentNode;
				}
				currentNode.next = currentNode.next.next;
				--this.size;
			} else {
				currentNode.next.previous = currentNode;
				currentNode = currentNode.next;
			}
		}
	}
	
	this.tail = currentNode;
	if (this.tail) {
		this.tail.next = null;
	}
	
	return deletedNode;
};

/**
 * 查找值
 * @param {Object} findParams
 * @param {*} findParams.value
 * @param {function} [findParams.callback]
 * @return {DoubleLinkedListNode | null}
 */
DoubleLinkedList.prototype.find = function find(findParams) {
	findParams = isObject(findParams) ? findParams : {};
	var value = findParams.value;
	var callback = findParams.callback;
	var currentNode = this.head;
	
	while (currentNode) {
		// If callback is specified then try to find node by callback.
		if (callback && isFunction(callback) && callback(currentNode.value)) {
			break;
		} else if (!isUndefined(value) && this.compare.equal(currentNode.value, value)) {
			break;
		}
		
		currentNode = currentNode.next;
	}
	
	return currentNode;
};

/**
 * 删除尾巴
 * @return {DoubleLinkedListNode | null}
 */
DoubleLinkedList.prototype.deleteTail = function deleteTail() {
	var deletedTail = this.tail;
	if (this.head === this.tail) {
		this.clear();
	} else {
		this.tail = this.tail.previous;
		this.tail.next = null;
		--this.size;
	}
	
	return deletedTail;
};

/**
 * 删除头部
 * @return {DoubleLinkedListNode | null}
 */
DoubleLinkedList.prototype.deleteHead = function deleteHead() {
	var deletedHead = this.head;
	if (this.head === this.tail) {
		this.clear();
	} else {
		this.head = this.head.next;
		this.head.previous = null;
		--this.size;
	}
	
	return deletedHead;
};

/**
 * 将node以数组返回
 * @return {DoubleLinkedListNode[]}
 */
DoubleLinkedList.prototype.toArray = function toArray() {
	var index = -1;
	var nodes = new Array(this.size);
	var currentNode = this.head;
	while (currentNode) {
		nodes[++index] = currentNode;
		currentNode = currentNode.next;
	}
	
	return nodes;
};

/**
 * 从数组中添加
 * @param {*[]} values - Array of values that need to be converted to linked list.
 * @return {DoubleLinkedList}
 */
DoubleLinkedList.prototype.fromArray = function fromArray(values) {
	var self = this;
	if (Array.isArray(values)) {
		values.forEach(function(value) {
			self.append(value);
		});
	}
	
	return self;
};

/**
 * 转化为字符串
 * @param {function} [callback]
 * @return {string}
 */
DoubleLinkedList.prototype.toString = function toString(callback) {
	return this.toArray().map(function(node) {
		return node.toString(callback);
	}).toString();
};

/**
 * @param {Function} [comparatorFunction]
 */
function DoubleLinkedList(comparatorFunction) {
	this.clear();
	this.compare = new Comparator(comparatorFunction);
}

function doubleLinkedList(comparatorFunction) {
	return new DoubleLinkedList(comparatorFunction);
}

doubleLinkedList.DoubleLinkedList = DoubleLinkedList;
export default doubleLinkedList;

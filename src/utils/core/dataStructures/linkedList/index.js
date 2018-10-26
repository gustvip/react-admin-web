import LinkedListNode from './linkedListNode';
import Comparator from '../../utils/comparator';
import isFunction from '../../utils/isFunction';
import isPureObject from '../../utils/isPureObject';
import map from '../../utils/map';
import isArray from '../../utils/isArray';
import _arrayLikeForEach from '../../utils/aaa/_arrayLikeForEach';

/**
 * 是否为空
 * @return {boolean}
 */
LinkedList.prototype.isEmpty = function isEmpty() {
	return this.size === 0;
};

/**
 * 是否有此值
 * @return {boolean}
 */
LinkedList.prototype.has = function has(value) {
	return !!this.find({value: value});
};

/**
 * 清空链表
 * @return {LinkedList}
 */
LinkedList.prototype.clear = function clear() {
	this.head = this.tail = null;
	this.size = 0;
	return this;
};

/**
 * 向前添加
 * @param {*} value
 * @return {LinkedList}
 */
LinkedList.prototype.prepend = function prepend(value) {
	var newNode = new LinkedListNode(value, this.head);
	if (this.isEmpty()) {
		this.head = this.tail = newNode;
	} else {
		this.head = newNode;
	}
	++this.size;
	
	return this;
};

/**
 * 向后添加
 * @param {*} value
 * @return {LinkedList}
 */
LinkedList.prototype.append = function append(value) {
	var newNode = new LinkedListNode(value);
	
	if (this.isEmpty()) {
		this.head = this.tail = newNode;
	} else {
		this.tail.next = this.tail = newNode;
	}
	++this.size;
	
	return this;
};

/**
 * 删除值
 * @param {*} value
 * @return {LinkedListNode | null}
 */
LinkedList.prototype.delete = function _delete(value) {
	var deletedNode = null;
	while (this.head && this.compare.equal(this.head.value, value)) {
		deletedNode = this.head;
		this.head = this.head.next;
		--this.size;
	}
	
	var currentNode = this.head;
	if (currentNode) {
		while (currentNode.next) {
			if (this.compare.equal(currentNode.next.value, value)) {
				deletedNode = currentNode.next;
				currentNode.next = currentNode.next.next;
				--this.size;
			} else {
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
 * @return {LinkedListNode | null}
 */
LinkedList.prototype.find = function find(findParams) {
	findParams = isPureObject(findParams) ? findParams : {};
	var value = findParams.value;
	var callback = findParams.callback;
	var currentNode = this.head;
	
	while (currentNode) {
		if (callback && isFunction(callback) && callback(currentNode.value)) {
			break;
		} else if (this.compare.equal(currentNode.value, value)) {
			break;
		}
		
		currentNode = currentNode.next;
	}
	
	return currentNode;
};

/**
 * 删除尾巴
 * @return {LinkedListNode | null}
 */
LinkedList.prototype.deleteTail = function deleteTail() {
	var deletedTail = this.tail;
	var currentNode = this.head;
	
	if (this.head === this.tail) {
		this.clear();
	} else {
		while (currentNode.next) {
			if (!currentNode.next.next) {
				currentNode.next = null;
				break;
			} else {
				currentNode = currentNode.next;
			}
		}
		this.tail = currentNode;
		--this.size;
	}
	
	return deletedTail;
};

/**
 * 删除头部
 * @return {LinkedListNode | null}
 */
LinkedList.prototype.deleteHead = function deleteHead() {
	var deletedHead = this.head;
	if (this.head === this.tail) {
		this.clear();
	} else {
		this.head = this.head.next;
		--this.size;
	}
	
	return deletedHead;
};

/**
 * 从数组中添加
 * @param {*[]} values - Array of values that need to be converted to linked list.
 * @return {LinkedList}
 */
LinkedList.prototype.fromArray = function fromArray(values) {
	var self = this;
	if (isArray(values)) {
		_arrayLikeForEach(values, function(value) {
			self.append(value);
		});
	}
	
	return self;
};

/**
 * 将节点转化为数组形式
 * @return {LinkedListNode[]}
 */
LinkedList.prototype.toArray = function toArray() {
	var nodes = [];
	var currentNode = this.head;
	while (currentNode) {
		nodes.push(currentNode);
		currentNode = currentNode.next;
	}
	
	return nodes;
};

/**
 * @param {function} [callback]
 * @return {string}
 */
LinkedList.prototype.toString = function toString(callback) {
	return map(this.toArray(), function(node) {
		return node.toString(callback);
	}).toString();
};

/**
 * @param {Function} [comparatorFunction]
 */
function LinkedList(comparatorFunction) {
	this.clear();
	this.compare = new Comparator(comparatorFunction);
}

function linkedList(comparatorFunction) {
	return new LinkedList(comparatorFunction);
}

linkedList.LinkedList = LinkedList;
export default linkedList;

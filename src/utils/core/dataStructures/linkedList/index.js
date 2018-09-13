import LinkedListNode from "./linkedListNode";
import Comparator from "../../utils/comparator";
import isFunction from "../../utils/isFunction";
import isUndefined from "../../utils/isUndefined";
import isArray from "../../utils/isArray";
import isObject from "../../utils/isObject";
import isNull from "../../utils/isNull";

export default (function() {
	/**
	 * 是否为空
	 * @return {boolean}
	 */
	function isEmpty() {
		return isNull(this.head) || isNull(this.tail);
	}
	
	/**
	 * 是否有此值
	 * @return {boolean}
	 */
	function has(value) {
		return !!this.find({value});
	}
	
	/**
	 * 清空链表
	 * @return {LinkedList}
	 */
	function clear() {
		this.head = this.tail = null;
		return this;
	}
	
	/**
	 * 向前添加
	 * @param {*} value
	 * @return {LinkedList}
	 */
	function prepend(value) {
		// Make new node to be a head.
		var newNode = new LinkedListNode(value, this.head);
		if (this.isEmpty()) {
			this.head = this.tail = newNode;
		} else {
			this.head = newNode;
		}
		
		return this;
	}
	
	/**
	 * 向后添加
	 * @param {*} value
	 * @return {LinkedList}
	 */
	function append(value) {
		var newNode = new LinkedListNode(value);
		
		if (this.isEmpty()) {
			this.head = this.tail = newNode;
		} else {
			this.tail.next = this.tail = newNode;
		}
		
		return this;
	}
	
	/**
	 * 删除值
	 * @param {*} value
	 * @return {LinkedListNode | null}
	 */
	function _delete(value) {
		var deletedNode = null;
		while (this.head && this.compare.equal(this.head.value, value)) {
			deletedNode = this.head;
			this.head = this.head.next;
		}
		
		var currentNode = this.head;
		if (currentNode) {
			while (currentNode.next) {
				if (this.compare.equal(currentNode.next.value, value)) {
					deletedNode = currentNode.next;
					currentNode.next = currentNode.next.next;
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
	}
	
	/**
	 * 查找值
	 * @param {Object} findParams
	 * @param {*} findParams.value
	 * @param {function} [findParams.callback]
	 * @return {LinkedListNode | null}
	 */
	function find(findParams) {
		findParams = isObject(findParams) ? findParams : {};
		var value = findParams.value;
		var callback = findParams.callback;
		var currentNode = this.head;
		
		while (currentNode) {
			// If callback is specified then try to find node by callback.
			if (callback && isFunction(callback)) {
				if (callback(currentNode.value)) {
					break;
				}
			} else if (!isUndefined(value) && this.compare.equal(currentNode.value, value)) {
				break;
			}
			
			currentNode = currentNode.next;
		}
		
		return currentNode;
	}
	
	/**
	 * 删除尾巴
	 * @return {LinkedListNode | null}
	 */
	function deleteTail() {
		var deletedTail = this.tail;
		var currentNode = this.head;
		
		if (this.head === this.tail) {
			// There is only one or zero node in linked list.
			this.head = this.tail = null;
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
		}
		
		return deletedTail;
	}
	
	/**
	 * 删除头部
	 * @return {LinkedListNode | null}
	 */
	function deleteHead() {
		var deletedHead = this.head;
		if (this.head === this.tail) {
			// There is only one or zero node in linked list.
			this.head = this.tail = null;
		} else {
			this.head = this.head.next;
		}
		
		return deletedHead;
	}
	
	/**
	 * 从数组中添加
	 * @param {*[]} values - Array of values that need to be converted to linked list.
	 * @return {LinkedList}
	 */
	function fromArray(values) {
		var self = this;
		if (isArray(values)) {
			values.forEach(function(value) {
				self.append(value);
			});
		}
		
		return self;
	}
	
	/**
	 * 将节点转化为数组形式
	 * @return {LinkedListNode[]}
	 */
	function toArray() {
		var nodes = [];
		var currentNode = this.head;
		while (currentNode) {
			nodes.push(currentNode);
			currentNode = currentNode.next;
		}
		
		return nodes;
	}
	
	/**
	 * @param {function} [callback]
	 * @return {string}
	 */
	function toString(callback) {
		return this.toArray().map(function(node) {
			return node.toString(callback);
		}).toString();
	}
	
	Object.defineProperties(LinkedList.prototype, {
		constructor: {
			value: LinkedList,
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
		prepend: {
			value: prepend,
			configuarable: false,
		},
		append: {
			value: append,
			configuarable: false,
		},
		delete: {
			value: _delete,
			configuarable: false,
		},
		find: {
			value: find,
			configuarable: false,
		},
		deleteTail: {
			value: deleteTail,
			configuarable: false,
		},
		deleteHead: {
			value: deleteHead,
			configuarable: false,
		},
		fromArray: {
			value: fromArray,
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
	
	/**
	 * @param {Function} [comparatorFunction]
	 */
	function LinkedList(comparatorFunction) {
		/** @var LinkedListNode */
		this.head = null;
		
		/** @var LinkedListNode */
		this.tail = null;
		
		this.compare = new Comparator(comparatorFunction);
	}
	
	return function linkedList(comparatorFunction) {
		return new LinkedList(comparatorFunction);
	};
}());

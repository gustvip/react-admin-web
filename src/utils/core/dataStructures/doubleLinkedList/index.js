import DoubleLinkedListNode from "./doubleLinkedListNode";
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
	 * @return {DoubleLinkedList}
	 */
	function clear() {
		this.head = this.tail = null;
		return this;
	}

	/**
	 * 向前添加
	 * @param {*} value
	 * @return {DoubleLinkedList}
	 */
	function prepend(value) {
		// Make new node to be a head.
		var newNode = new DoubleLinkedListNode(value, this.head);
		// If there is no head yet let's make new node a head.
		if (this.isEmpty()) {
			this.head = this.tail = newNode;
		} else {
			this.head = this.head.previous = newNode;
		}

		return this;
	}

	/**
	 * 向后添加
	 * @param {*} value
	 * @return {DoubleLinkedList}
	 */
	function append(value) {
		var newNode = new DoubleLinkedListNode(value, null, this.tail);

		// If there is no head yet let's make new node a head.
		if (this.isEmpty()) {
			this.head = this.tail = newNode;
		} else {
			this.tail = this.tail.next = newNode;
		}

		return this;
	}

	/**
	 * 删除值
	 * @param {*} value
	 * @return {DoubleLinkedListNode | null}
	 */
	function _delete(value) {
		var deletedNode = null;
		while (this.head && this.compare.equal(this.head.value, value)) {
			deletedNode = this.head;
			this.head = this.head.next;
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
	}

	/**
	 * 查找值
	 * @param {Object} findParams
	 * @param {*} findParams.value
	 * @param {function} [findParams.callback]
	 * @return {DoubleLinkedListNode | null}
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
	 * @return {DoubleLinkedListNode | null}
	 */
	function deleteTail() {
		var deletedTail = this.tail;
		if (this.head === this.tail) {
			this.head = this.tail = null;
		} else {
			this.tail = this.tail.previous;
			this.tail.next = null;
		}

		return deletedTail;
	}

	/**
	 * 删除头部
	 * @return {DoubleLinkedListNode | null}
	 */
	function deleteHead() {
		var deletedHead = this.head;
		if (this.head === this.tail) {
			this.head = this.tail = null;
		} else {
			this.head = this.head.next;
			this.head.previous = null;
		}

		return deletedHead;
	}

	/**
	 * 将node以数组返回
	 * @return {DoubleLinkedListNode[]}
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
	 * 从数组中添加
	 * @param {*[]} values - Array of values that need to be converted to linked list.
	 * @return {DoubleLinkedList}
	 */
	function fromArray(values) {
		var self = this;
		if (isArray(values)) {
			values.forEach((value) => {
				self.append(value);
			});
		}

		return self;
	}

	/**
	 * 转化为字符串
	 * @param {function} [callback]
	 * @return {string}
	 */
	function toString(callback) {
		return this.toArray().map((node) => {
			return node.toString(callback);
		}).toString();
	}

	Object.defineProperties(DoubleLinkedList.prototype, {
		constructor: {
			value: DoubleLinkedList,
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
	function DoubleLinkedList(comparatorFunction) {
		/** @var LinkedListNode */
		this.head = null;

		/** @var LinkedListNode */
		this.tail = null;

		this.compare = new Comparator(comparatorFunction);
	}

	return function doubleLinkedList(comparatorFunction) {
		return new DoubleLinkedList(comparatorFunction);
	};
}());

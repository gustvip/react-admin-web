import LinkedListNode from './linkedListNode';
import Comparator from '../../utils/comparator';
import isFunction from '../../utils/isFunction';
import isUndefined from '../../utils/isUndefined';
import isArray from '../../utils/isArray';
import isObject from '../../utils/isObject';

export default (function () {
	'use strict';
	
	/**
	 * 是否为空
	 * @return {boolean}
	 */
	function isEmpty () {
		return !this.head;
	}
	
	/**
	 * @param {*} value
	 * @return {LinkedList}
	 */
	function prepend (value) {
		// Make new node to be a head.
		var newNode = new LinkedListNode(value, this.head);
		this.head = newNode;
		
		// If there is no tail yet let's make new node a tail.
		if (!this.tail) {
			this.tail = newNode;
		}
		
		return this;
	}
	
	/**
	 * @param {*} value
	 * @return {LinkedList}
	 */
	function append (value) {
		var newNode = new LinkedListNode(value);
		
		// If there is no head yet let's make new node a head.
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			// Attach new node to the end of linked list.
			this.tail.next = newNode;
			this.tail = newNode;
		}
		
		return this;
	}
	
	/**
	 * @param {*} value
	 * @return {LinkedListNode}
	 */
	function _delete (value) {
		if (this.isEmpty()) {
			return null;
		}
		
		var deletedNode = null;
		
		// If the head must be deleted then make next node that is differ
		// from the head to be a new head.
		while (this.head && this.compare.equal(this.head.value, value)) {
			deletedNode = this.head;
			this.head = this.head.next;
		}
		
		var currentNode = this.head;
		
		if (currentNode !== null) {
			// If next node must be deleted then make next node to be a next next one.
			while (currentNode.next) {
				if (this.compare.equal(currentNode.next.value, value)) {
					deletedNode = currentNode.next;
					currentNode.next = currentNode.next.next;
				} else {
					currentNode = currentNode.next;
				}
			}
		}
		
		// Check if tail must be deleted.
		if (this.compare.equal(this.tail.value, value)) {
			this.tail = currentNode;
		}
		
		return deletedNode;
	}
	
	/**
	 * @param {Object} findParams
	 * @param {*} findParams.value
	 * @param {function} [findParams.callback]
	 * @return {LinkedListNode}
	 */
	function find (findParams) {
		findParams = isObject(findParams) ? findParams : {};
		var value = findParams.value;
		var callback = findParams.callback;
		var currentNode = this.head;
		
		while (currentNode) {
			// If callback is specified then try to find node by callback.
			if (callback && isFunction(callback) && callback(currentNode.value)) {
				return currentNode;
			}
			
			// If value is specified then try to compare by value..
			if (!isUndefined(value) && this.compare.equal(currentNode.value, value)) {
				return currentNode;
			}
			
			currentNode = currentNode.next;
		}
		
		return null;
	}
	
	/**
	 * @return {LinkedListNode}
	 */
	function deleteTail () {
		var deletedTail = this.tail;
		var currentNode = this.head;
		
		if (this.head === this.tail) {
			// There is only one or zero node in linked list.
			this.head = null;
			this.tail = null;
		} else {
			while (currentNode.next) {
				if (!currentNode.next.next) {
					currentNode.next = null;
				} else {
					currentNode = currentNode.next;
				}
			}
			
			this.tail = currentNode;
		}
		
		return deletedTail;
	}
	
	/**
	 * @return {LinkedListNode}
	 */
	function deleteHead () {
		var deletedHead = this.head;
		if (this.head === this.tail) {
			// There is only one or zero node in linked list.
			this.head = null;
			this.tail = null;
		} else {
			this.head = this.head.next;
		}
		
		return deletedHead;
	}
	
	/**
	 * @param {*[]} values - Array of values that need to be converted to linked list.
	 * @return {LinkedList}
	 */
	function fromArray (values) {
		var self = this;
		if (isArray(values)) {
			values.forEach(function (value) {
				self.append(value);
			});
		}
		
		return self;
	}
	
	/**
	 * @return {LinkedListNode[]}
	 */
	function toArray () {
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
	function toString (callback) {
		return this.toArray().map(function (node) {
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
	function LinkedList (comparatorFunction) {
		/** @var LinkedListNode */
		this.head = null;
		
		/** @var LinkedListNode */
		this.tail = null;
		
		this.compare = new Comparator(comparatorFunction);
	}
	
	return function linkedList (comparatorFunction) {
		return new LinkedList(comparatorFunction);
	};
})();

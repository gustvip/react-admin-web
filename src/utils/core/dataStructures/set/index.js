/**
 * Created by joey on 2018/8/20
 */
import DoubleLinkedList from '../doubleLinkedList';
import isArray from '../../utils/isArray/index';

export default (function () {
	/**
	 * 长度
	 * @return  {number}
	 */
	function size () {
		var index = 0;
		var head = this.doubleLinkedList.head;
		while (head) {
			++index;
			head = head.next;
		}
		return index;
	}
	
	/**
	 * 是否有此值
	 * @param {*} value
	 * @return {boolean}
	 */
	function has (value) {
		return !!this.doubleLinkedList.find({value: value});
	}
	
	/**
	 * 清除
	 * @return {Map}
	 */
	function clear () {
		this.doubleLinkedList.clear();
		return this;
	}
	
	/**
	 * 获取value组成的数组
	 * @return {*[]}
	 */
	function values () {
		var values = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			values.push(head.value);
			head = head.next;
		}
		return values;
	}
	
	/**
	 * 获取[key,value]组成的数组
	 * @return {[][]}
	 */
	function entries () {
		var entries = [];
		var head = this.doubleLinkedList.head;
		while (head) {
			entries.push([head.value, head.value]);
			head = head.next;
		}
		return entries;
	}
	
	/**
	 * 遍历
	 * @param {function} callback
	 * @return {Map}
	 */
	function forEach (callback) {
		var head = this.doubleLinkedList.head;
		while (head) {
			callback(head.value, head.value);
			head = head.next;
		}
		return this;
	}
	
	/**
	 * 设置值
	 * @param {*} value
	 * @return {Map}
	 */
	function setItem (value) {
		var oldNode = this.doubleLinkedList.find({value: value});
		if (oldNode) {
			oldNode.value = value;
		} else {
			this.doubleLinkedList.append(value);
		}
		return this;
	}
	
	/**
	 * 清除值
	 * @param {*} value
	 * @return {Map}
	 */
	function removeItem (value) {
		this.doubleLinkedList.delete(value);
		return this;
	}
	
	Object.defineProperties(Set.prototype, {
		constructor: {
			value: Map,
			configuarable: false,
		},
		size: {
			get: size,
			configuarable: false,
		},
		has: {
			value: has,
			configuarable: false,
		},
		set: {
			value: setItem,
			configuarable: false,
		},
		
		add: {
			value: setItem,
			configuarable: false,
		},
		
		remove: {
			value: removeItem,
			configuarable: false,
		},
		
		delete: {
			value: removeItem,
			configuarable: false,
		},
		
		clear: {
			value: clear,
			configuarable: false,
		},
		
		values: {
			get: values,
			configuarable: false,
		},
		
		entries: {
			get: entries,
			configuarable: false,
		},
		
		forEach: {
			value: forEach,
			configuarable: false,
		},
	});
	
	function Set () {
		this.doubleLinkedList = DoubleLinkedList();
	}
	
	return function set (object) {
		var _set = new Set;
		if (object instanceof Set) {
			object.forEach(function (value) {
				_set.set(value);
			});
		} else if (isArray(object)) {
			object.forEach(function (value) {
				_set.set(value);
			});
		}
		return _set;
	};
})();

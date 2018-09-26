/**
 * Created by joey on 2018/8/20
 */
import DoubleLinkedList from "../doubleLinkedList";
import isArray from "../../utils/isArray/index";

/**
 * 长度
 * @return  {number}
 */
function size() {
	return this.doubleLinkedList.size;
}

/**
 * 是否有此值
 * @param {*} value
 * @return {boolean}
 */
function has(value) {
	return !!this.doubleLinkedList.find({value: value});
}

/**
 * 清除
 * @return {Map}
 */
function clear() {
	this.doubleLinkedList.clear();
	return this;
}

/**
 * 获取value组成的数组
 * @return {*[]}
 */
function values() {
	let index = -1;
	let values = new Array(this.size);
	let head = this.doubleLinkedList.head;
	while (head) {
		values[++index] = head.value;
		head = head.next;
	}
	return values;
}

/**
 * 获取[key,value]组成的数组
 * @return {[][]}
 */
function entries() {
	let index = -1;
	let entries = new Array(this.size);
	let head = this.doubleLinkedList.head;
	while (head) {
		entries[++index] = [head.value, head.value];
		head = head.next;
	}
	return entries;
}

/**
 * 遍历
 * @param {function} callback
 * @return {Set}
 */
function forEach(callback) {
	let head = this.doubleLinkedList.head;
	while (head) {
		callback(head.value, head.value);
		head = head.next;
	}
	return this;
}

/**
 * 设置值
 * @param {*} value
 * @return {Set}
 */
function setItem(value) {
	let oldNode = this.doubleLinkedList.find({value: value});
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
 * @return {Set}
 */
function removeItem(value) {
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

function Set() {
	this.doubleLinkedList = DoubleLinkedList();
}

export default function set(object) {
	let _set = new Set();
	if (object instanceof Set) {
		object.forEach(function(value) {
			_set.set(value);
		});
	} else if (isArray(object)) {
		object.forEach(function(value) {
			_set.set(value);
		});
	}
	return _set;
}

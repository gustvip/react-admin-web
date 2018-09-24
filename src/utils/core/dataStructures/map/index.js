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
 * 是否有此属性
 * @param {*} key
 * @return {boolean}
 */
function has(key) {
	return !!this.doubleLinkedList.find({value: {key: key}});
}

/**
 * 获取属性对应的值
 * @param {*} key
 * @return {undefined || *}
 */
function get(key) {
	var result = this.doubleLinkedList.find({value: {key: key}});
	return result ? result.value.value : undefined;
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
 * 获取key组成的数组
 * @return {*[]}
 */
function keys() {
	var index = -1;
	var keys = new Array(this.size);
	var head = this.doubleLinkedList.head;
	while (head) {
		keys[++index] = head.value.key;
		head = head.next;
	}
	return keys;
}

/**
 * 获取value组成的数组
 * @return {*[]}
 */
function values() {
	var index = -1;
	var values = new Array(this.size);
	var head = this.doubleLinkedList.head;
	while (head) {
		values[++index] = head.value.value;
		head = head.next;
	}
	return values;
}

/**
 * 获取[key,value]组成的数组
 * @return {[][]}
 */
function entries() {
	var index = -1;
	var entries = new Array(this.size);
	var head = this.doubleLinkedList.head;
	while (head) {
		entries[++index] = [head.value.key, head.value.value];
		head = head.next;
	}
	return entries;
}

/**
 * 遍历
 * @param {function} callback
 * @return {Map}
 */
function forEach(callback) {
	var head = this.doubleLinkedList.head;
	while (head) {
		callback(head.value.value, head.value.key);
		head = head.next;
	}
	return this;
}

/**
 * 设置值
 * @param {*} key
 * @param {*} value
 * @return {Map}
 */
function setItem(key, value) {
	var oldNode = this.doubleLinkedList.find({value: {key: key}});
	if (oldNode) {
		oldNode.value.value = value;
	} else {
		this.doubleLinkedList.append({
			key: key,
			value: value,
		});
	}
	return this;
}

/**
 * 清楚值
 * @param {*} key
 * @return {Map}
 */
function removeItem(key) {
	this.doubleLinkedList.delete({key: key});
	return this;
}

/**
 * 比较函数
 * @param {object} a
 * @param {object} b
 * @return {number}
 */
function compareFunction(a, b) {
	if (a.key === b.key) {
		return 0;
	}
	return a.key < b.key ? -1 : 1;
}

Object.defineProperties(Map.prototype, {
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
	get: {
		value: get,
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
	
	keys: {
		get: keys,
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

function Map() {
	this.doubleLinkedList = DoubleLinkedList(compareFunction);
}

export default function map(object) {
	var _map = new Map();
	if (object instanceof Map) {
		object.forEach(function(value, key) {
			_map.set(key, value);
		});
	} else if (isArray(object)) {
		var i = -1;
		var n = object.length;
		var o;
		while (++i < n && isArray(o = object[i])) {
			_map.set(o[0], o[1]);
		}
	}
	return _map;
}

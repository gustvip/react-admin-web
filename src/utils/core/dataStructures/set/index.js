/**
 * Created by joey on 2018/8/20
 */
import DoubleLinkedList from "../doubleLinkedList";

function Set() {
	this.doubleLinkedList = DoubleLinkedList();
}

Object.defineProperty(Set.prototype, "size", {
	get: function() {
		return this.doubleLinkedList.size;
	},
	configurable: false,
});

/**
 * 是否有此值
 * @param {*} value
 * @return {boolean}
 */
Set.prototype.has = function has(value) {
	return !!this.doubleLinkedList.find({value: value});
};

/**
 * 清除
 * @return {Map}
 */
Set.prototype.clear = function clear() {
	this.doubleLinkedList.clear();
	return this;
};

/**
 * 获取value组成的数组
 * @return {*[]}
 */
Set.prototype.values = function values() {
	var index = -1;
	var values = new Array(this.size);
	var head = this.doubleLinkedList.head;
	while (head) {
		values[++index] = head.value;
		head = head.next;
	}
	return values;
};

/**
 * 获取[key,value]组成的数组
 * @return {[][]}
 */
Set.prototype.entries = function entries() {
	var index = -1;
	var entries = new Array(this.size);
	var head = this.doubleLinkedList.head;
	while (head) {
		entries[++index] = [head.value, head.value];
		head = head.next;
	}
	return entries;
};

/**
 * 遍历
 * @param {function} callback
 * @return {Set}
 */
Set.prototype.forEach = function forEach(callback) {
	var head = this.doubleLinkedList.head;
	while (head) {
		callback(head.value, head.value);
		head = head.next;
	}
	return this;
};

/**
 * 设置值
 * @param {*} value
 * @return {Set}
 */
Set.prototype.add = function add(value) {
	var oldNode = this.doubleLinkedList.find({value: value});
	if (oldNode) {
		oldNode.value = value;
	} else {
		this.doubleLinkedList.append(value);
	}
	return this;
};

/**
 * 清除值
 * @param {*} value
 * @return {Set}
 */
Set.prototype.delete = function(value) {
	this.doubleLinkedList.delete(value);
	return this;
};

function set(object) {
	var _set = new Set();
	if (object instanceof Set) {
		object.forEach(function(value) {
			_set.add(value);
		});
	} else if (Array.isArray(object)) {
		object.forEach(function(value) {
			_set.add(value);
		});
	}
	return _set;
}

set.Set = Set;
export default set;

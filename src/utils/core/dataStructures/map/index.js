/**
 * Created by joey on 2018/8/20
 */
import DoubleLinkedList from '../doubleLinkedList';
import isArray from '../../utils/isArray';
import _arrayLikeForEach from '../../utils/aaa/_arrayLikeForEach';

function Map() {
	this.doubleLinkedList = DoubleLinkedList(compareFunction);
	this.size = this.doubleLinkedList.size;
}

/**
 * 是否有此属性
 * @param {*} key
 * @return {boolean}
 */
Map.prototype.has = function has(key) {
	return !!this.doubleLinkedList.find({value: {key: key}});
};

/**
 * 获取属性对应的值
 * @param {*} key
 * @return {undefined || *}
 */
Map.prototype.get = function get(key) {
	var result = this.doubleLinkedList.find({value: {key: key}});
	return result ? result.value.value : undefined;
};

/**
 * 清除
 * @return {Map}
 */
Map.prototype.clear = function clear() {
	this.doubleLinkedList.clear();
	this.size = this.doubleLinkedList.size;
	return this;
};

/**
 * 获取key组成的数组
 * @return {*[]}
 */
Map.prototype.keys = function keys() {
	var index = -1;
	var keys = new Array(this.size);
	var head = this.doubleLinkedList.head;
	while (head) {
		keys[++index] = head.value.key;
		head = head.next;
	}
	return keys;
};

/**
 * 获取value组成的数组
 * @return {*[]}
 */
Map.prototype.values = function values() {
	var index = -1;
	var values = new Array(this.size);
	var head = this.doubleLinkedList.head;
	while (head) {
		values[++index] = head.value.value;
		head = head.next;
	}
	return values;
};

/**
 * 获取[key,value]组成的数组
 * @return {[][]}
 */
Map.prototype.entries = function entries() {
	var index = -1;
	var entries = new Array(this.size);
	var head = this.doubleLinkedList.head;
	while (head) {
		entries[++index] = [head.value.key, head.value.value];
		head = head.next;
	}
	return entries;
};

/**
 * 遍历
 * @param {function} callback
 * @return {Map}
 */
Map.prototype.forEach = function forEach(callback) {
	var head = this.doubleLinkedList.head;
	while (head) {
		callback(head.value.value, head.value.key);
		head = head.next;
	}
	return this;
};

/**
 * 设置值
 * @param {*} key
 * @param {*} value
 * @return {Map}
 */
Map.prototype.set = function set(key, value) {
	var oldNode = this.doubleLinkedList.find({value: {key: key}});
	if (oldNode) {
		oldNode.value.value = value;
	} else {
		this.doubleLinkedList.append({
			key: key,
			value: value,
		});
	}
	this.size = this.doubleLinkedList.size;
	return this;
};

/**
 * 删除值
 * @param {*} key
 * @return {Map}
 */
Map.prototype.delete = function(key) {
	this.doubleLinkedList.delete({key: key});
	this.size = this.doubleLinkedList.size;
	return this;
};

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

function map(object) {
	var _map = new Map();
	if (object instanceof Map) {
		object.forEach(function(value, key) {
			_map.set(key, value);
		});
	} else if (isArray(object)) {
		_arrayLikeForEach(object, function(value) {
			if (isArray(value)) {
				_map.set(value[0], value[1]);
			}
		});
	}
	return _map;
}

map.Map = Map;
export default map;

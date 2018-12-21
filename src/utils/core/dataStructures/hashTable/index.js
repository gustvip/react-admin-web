import doubleLinkedList from '../doubleLinkedList/index';
import toLength from '../../utils/toLength/index';
import isUndefined from '../../utils/isUndefined/index';

/**
 * @param {number} hashTableSize
 */
function HashTable (hashTableSize) {
	hashTableSize = isUndefined(hashTableSize) ? 32 : toLength(hashTableSize);
	this.buckets = new Array(hashTableSize).fill().map(function () {
		return new doubleLinkedList();
	});
	this.keys = {};
}

/**
 * @param {string} key
 * @return {number}
 */
HashTable.prototype.hash = function hash (key) {
	var hash = [].reduce.call(
		key,
		function (hashAccumulator, keySymbol) {
			return hashAccumulator + keySymbol.charCodeAt(0);
		},
		0,
	);
	return hash % this.buckets.length;
};

/**
 * @param {string} key
 * @param {*} value
 */
HashTable.prototype.set = function set (key, value) {
	var keyHash = this.hash(key);
	this.keys[key] = keyHash;
	var doubleLinkedList = this.buckets[keyHash];
	var node = doubleLinkedList.find({
		callback: function (nodeValue) {
			return nodeValue.key === key;
		},
	});
	
	if (!node) {
		doubleLinkedList.append({
			key: key,
			value: value,
		});
	} else {
		node.value.value = value;
	}
};

/**
 * @param {string} key
 * @return {*}
 */
HashTable.prototype.delete = function (key) {
	var keyHash = this.hash(key);
	delete this.keys[key];
	var doubleLinkedList = this.buckets[keyHash];
	var node = doubleLinkedList.find({
		callback: function (nodeValue) {
			return nodeValue.key === key;
		},
	});
	
	if (node) {
		return doubleLinkedList.delete(node.value);
	}
	
	return null;
};

/**
 * @param {string} key
 * @return {*}
 */
HashTable.prototype.get = function get (key) {
	var doubleLinkedList = this.buckets[this.hash(key)];
	var node = doubleLinkedList.find({
		callback: function (nodeValue) {
			return nodeValue.key === key;
		},
	});
	
	return node ? node.value.value : undefined;
};

/**
 * @param {string} key
 * @return {*}
 */
HashTable.prototype.has = function has (key) {
	return Object.prototype.hasOwnProperty.call(this.keys, key);
};

/**
 * @return {string[]}
 */
HashTable.prototype.getKeys = function getKeys () {
	return Object.keys(this.keys);
};

function hashTable (hashTableSize) {
	return new HashTable(hashTableSize);
}

hashTable.HashTable = HashTable;
export default hashTable;

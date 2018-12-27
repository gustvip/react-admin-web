import doubleLinkedList from '../doubleLinkedList/index';
import {InterfaceHasTable} from './@types';
import {InterfaceDoubleLinkedList} from '../doubleLinkedList/@types';

export default class HashTable implements InterfaceHasTable {
	constructor(hashTableSize = 32) {
		this.buckets = new Array(hashTableSize).fill(null).map(() => new doubleLinkedList());
		this.keys = {};
	}
	
	private buckets: InterfaceDoubleLinkedList[];
	private keys: object;
	
	public hash(key) {
		// @ts-ignore
		var hash: number = [].reduce.call(key, (prev, value) => prev + value.charCodeAt(0), 0);
		return hash % this.buckets.length;
	}
	
	public set(key, value) {
		var keyHash = this.hash(key);
		this.keys[key] = keyHash;
		var doubleLinkedList = this.buckets[keyHash];
		var node = doubleLinkedList.find({
			callback(nodeValue) {
				return nodeValue.key === key;
			},
		});
		
		if (!node) {
			doubleLinkedList.append({key, value});
		} else {
			node.value.value = value;
		}
		return this;
	}
	
	public delete(key) {
		var keyHash = this.hash(key);
		delete this.keys[key];
		var doubleLinkedList = this.buckets[keyHash];
		var node = doubleLinkedList.find({
			callback(nodeValue) {
				return nodeValue.key === key;
			},
		});
		
		if (node) {
			doubleLinkedList.delete(node.value);
		}
		
		return this;
	}
	
	public get(key) {
		var doubleLinkedList = this.buckets[this.hash(key)];
		var node = doubleLinkedList.find({
			callback(nodeValue) {
				return nodeValue.key === key;
			},
		});
		
		return node ? node.value.value : undefined;
	}
	
	public has(key) {
		return Object.prototype.hasOwnProperty.call(this.keys, key);
	}
	
	public getKeys() {
		return Object.keys(this.keys);
	}
}

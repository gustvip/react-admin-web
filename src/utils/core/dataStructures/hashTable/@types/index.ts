import {InterfaceDoubleLinkedList} from '../../doubleLinkedList/@types';

export interface InterfaceHasTable {
	buckets: InterfaceDoubleLinkedList[];
	keys: object;
	hash: (key: string) => number
	set: (key: string, value?: any) => this
	delete: (key: string) => this
	get: (key: string) => any
	has: (key?: any) => boolean
	getKeys: () => string[]
}

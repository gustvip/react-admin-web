import {InterfaceDoubleLinkedList} from '../../doubleLinkedList/@types';

export interface InterfaceSet {
	doubleLinkedList: InterfaceDoubleLinkedList
	size: number,
	add: (value?: any) => this
	delete: (value?: any) => this
	forEach: (callback: (value?: any, key?: any) => any) => this
	entries: () => [any, any][]
	values: () => any[]
	clear: () => this
	has: (key?: any) => boolean
}

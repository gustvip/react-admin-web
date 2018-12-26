import InterfaceComparator from '../../../utils/comparator/@types';

export interface InterfaceDoubleLinkedListNode {
	value: any
	next: any
	previous: any
	toString: (callback?: (...arg) => string) => string
}

export interface InterfaceDoubleLinkedList {
	head: null | InterfaceDoubleLinkedListNode
	tail: null | InterfaceDoubleLinkedListNode
	size: number
	compare: InterfaceComparator
	clear: () => this
	toString: (callback?: (...arg) => string) => string
	toArray: () => InterfaceDoubleLinkedListNode[]
	fromArray: (values: any[]) => this
	deleteHead: () => null | InterfaceDoubleLinkedListNode
	deleteTail: () => null | InterfaceDoubleLinkedListNode
	find: (params: { value?: any, callback?: Function }) => null | InterfaceDoubleLinkedListNode
	delete: (value?: any) => null | InterfaceDoubleLinkedListNode
	append: (value?: any) => this
	prepend: (value?: any) => this
	has: (value?: any) => boolean
	isEmpty: () => boolean
}

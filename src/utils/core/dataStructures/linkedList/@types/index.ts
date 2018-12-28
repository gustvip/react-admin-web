import InterfaceComparator from '../../../utils/comparator/@types';

export interface InterfaceLinkedListNode {
	value: any
	next: any
	toString: (callback?: (...arg) => string) => string
}

export interface InterfaceLinkedList {
	head: null | InterfaceLinkedListNode
	tail: null | InterfaceLinkedListNode
	size: number
	compare: InterfaceComparator
	clear: () => this
	toString: (callback?: (...arg) => string) => string
	toArray: () => InterfaceLinkedListNode[]
	fromArray: (values: any[]) => this
	deleteHead: () => null | InterfaceLinkedListNode
	deleteTail: () => null | InterfaceLinkedListNode
	find: (params: { value?: any, callback?: Function }) => null | InterfaceLinkedListNode
	delete: (value?: any) => null | InterfaceLinkedListNode
	append: (value?: any) => this
	prepend: (value?: any) => this
	has: (value?: any) => boolean
	isEmpty: () => boolean
	reverse: () => this
}

export interface InterfaceQueue {
	size: number,
	toString: (callback?: (...arg) => string) => string
	dequeue: () => any
	enqueue: (value?: any) => this
	peek: () => any
	clear: () => this
	has: (value?: any) => boolean
	isEmpty: () => boolean
}

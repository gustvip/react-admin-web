export interface InterfaceStack {
	size: number,
	toString: (callback?: (...arg) => string) => string
	toArray: () => any[]
	pop: () => any
	push: (value?: any) => this
	peek: () => any
	clear: () => this
	has: (key?: any) => boolean
	isEmpty: () => boolean
}

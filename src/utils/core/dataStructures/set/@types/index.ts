export interface InterfaceSet {
	size: number,
	add: (value?: any) => this
	delete: (value?: any) => this
	forEach: (callback: (value?: any, key?: any) => any) => this
	entries: () => any[]
	values: () => any[]
	clear: () => this
	has: (key?: any) => boolean
}

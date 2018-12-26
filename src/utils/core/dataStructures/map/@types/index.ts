export interface InterfaceMap {
	size: number,
	delete: (key?: any) => this
	set: (key?: any, value?: any) => this
	forEach: (callback: (value?: any, key?: any) => any) => this
	entries: () => any[]
	values: () => any[]
	keys: () => any[]
	clear: () => this
	get: (key?: any) => any
	has: (key?: any) => boolean
}

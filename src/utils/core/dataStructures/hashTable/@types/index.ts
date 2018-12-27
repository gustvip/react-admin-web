export interface InterfaceHasTable {
	hash: (key: string) => number
	set: (key: string, value?: any) => this
	delete: (key: string) => this
	get: (key: string) => any
	has: (key?: any) => boolean
	getKeys: () => string[]
}

import Stack from '../index';

describe('Stack', () => {
	it('should create empty stack', () => {
		const stack = new Stack();
		expect(stack).not.toBeNull();
		expect(stack.linkedList).not.toBeNull();
		stack.push(1);
		expect(stack.size).toBe(1);
		expect(stack.has(2)).toBeFalsy();
		expect(stack.has(1)).toBeTruthy();
		expect(stack.clear()).toEqual(stack);
		expect(stack.has(1)).toBeFalsy();
	});
	
	it('should stack data to stack', () => {
		const stack = new Stack();
		
		stack.push(1);
		stack.push(2);
		
		expect(stack.size).toBe(2);
		expect(stack.toString()).toBe('1,2');
	});
	
	it('should peek data from stack', () => {
		const stack = new Stack();
		
		expect(stack.peek()).toBeUndefined();
		
		stack.push(1);
		stack.push(2);
		
		expect(stack.peek()).toBe(2);
		expect(stack.peek()).toBe(2);
	});
	
	it('should check if stack is empty', () => {
		const stack = new Stack();
		
		expect(stack.isEmpty()).toBe(true);
		
		stack.push(1);
		
		expect(stack.isEmpty()).toBe(false);
	});
	
	it('should pop data from stack', () => {
		const stack = new Stack();
		
		stack.push(1);
		stack.push(2);
		
		expect(stack.size).toBe(2);
		expect(stack.pop()).toBe(2);
		expect(stack.size).toBe(1);
		expect(stack.pop()).toBe(1);
		expect(stack.size).toBe(0);
		expect(stack.pop()).toBeUndefined();
		expect(stack.isEmpty()).toBe(true);
	});
	
	it('should be possible to push/pop objects', () => {
		const stack = new Stack();
		
		stack.push({
			value: 'test1',
			key: 'key1',
		});
		stack.push({
			value: 'test2',
			key: 'key2',
		});
		
		const stringifier = value => `${value.key}:${value.value}`;
		
		expect(stack.toString(stringifier)).toBe('key1:test1,key2:test2');
		expect(stack.pop().value).toBe('test2');
		expect(stack.pop().value).toBe('test1');
	});
	
	it('should be possible to convert stack to array', () => {
		const stack = new Stack();
		
		expect(stack.peek()).toBeUndefined();
		
		stack.push(1);
		stack.push(2);
		stack.push(3);
		
		expect(stack.toArray()).toEqual([3, 2, 1]);
	});
	
	it('add undefined value', () => {
		const stack = new Stack();
		
		expect(stack.peek()).toBeUndefined();
		
		stack.push(1);
		stack.push(undefined);
		
		expect(stack.toArray()).toEqual([undefined, 1]);
		expect(stack.size).toBe(2);
	});
});

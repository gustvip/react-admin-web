import inherit from '../index';

test('test inherit', () => {
	function child() {}
	
	function parent(a, b) {}
	
	parent.prototype.sayHi = function() {
		return 'hi';
	};
	
	inherit(child, parent);
	child.prototype.sayHello = function() {
		return 'hello';
	};
	const childInstance = new child();
	
	expect(childInstance instanceof child).toBeTruthy();
	expect(childInstance instanceof parent).toBeTruthy();
	expect(child.prototype.constructor).toEqual(child);
	expect(Object.prototype.hasOwnProperty.call(childInstance, 'sayHi')).toBeFalsy();
	expect(childInstance.sayHello()).toBe('hello');
	expect(childInstance.sayHi()).toBe('hi');
});

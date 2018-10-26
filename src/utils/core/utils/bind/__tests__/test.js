import bind from '../index';

test('test bind', () => {
	const obj = {name: 'aaa'};
	
	function fn1() {
		return this;
	}
	
	function fn2(a, b) {
		return a + b;
	}
	
	expect(() => {
		bind(1, obj)();
	}).toThrow();
	expect(bind(fn1, obj)()).toEqual(obj);
	expect(bind(fn2, obj, 1, 2)()).toEqual(3);
	expect(bind(fn2, obj, 1)(2)).toEqual(3);
	expect(bind(fn2, obj)(1, 2)).toEqual(3);
	expect(bind(fn2, obj, 1)(2, 3)).toEqual(3);
	expect(bind(fn2, obj, 1, 2)(3, 4)).toEqual(3);
	expect(bind(fn2, obj, 1, 2, 3)(4, 5)).toEqual(3);
});

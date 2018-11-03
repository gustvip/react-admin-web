import transform from '../index';

test('test transform array', () => {
	const mockCallback = jest.fn();
	const obj = [1, 2, 3];
	expect(transform([])).toBeUndefined();
	expect(transform([], mockCallback)).toBeUndefined();
	expect(transform(null, mockCallback)).toBeUndefined();
	expect(transform({}, mockCallback)).toBeUndefined();
	expect(transform('', mockCallback)).toBeUndefined();
	expect(transform(obj, (prev, value, index, arr) => {})).toBeUndefined();
	expect(transform([], (prev, value, index, arr) => {}, 1)).toBe(1);
	
	expect(transform(obj, (prev, value) => {
		return prev += value;
	}, 0)).toBe(0);
	expect(transform(obj, (prev, value) => {
		prev.push(value);
	}, [])).toEqual([1, 2, 3]);
	expect(transform(obj, (prev, value, index) => {
		prev.push(index);
	}, [])).toEqual([0, 1, 2]);
	expect(transform(obj, (prev, value, index, arr) => {
		prev.push(arr);
	}, [])).toEqual([obj, obj, obj]);
	expect(transform(obj, (prev, value, index, arr, other) => {
		prev.push(other);
	}, [])).toEqual([undefined, undefined, undefined]);
});

test('test transform object', () => {
	const obj = {
		a: 1,
		b: 2,
		c: 3,
	};
	
	expect(transform(obj, (prev, value, index, arr) => {})).toBeUndefined();
	expect(transform({}, (prev, value, index, arr) => {}, 1)).toBe(1);
	expect(transform(obj, (prev, value) => {
		return prev += value;
	}, 0)).toBe(0);
	
	expect(transform(obj, (prev, value, key) => {
		prev[key] = value;
		return prev;
	}, {})).toEqual({
		'a': 1,
		'b': 2,
		'c': 3,
	});
	
	expect(transform(obj, (prev, value, key) => {
		prev[value] = key;
		return prev;
	}, {})).toEqual({
		'1': 'a',
		'2': 'b',
		'3': 'c',
	});
	
	expect(transform(obj, (prev, value, key, obj) => {
		prev[key] = obj;
		return prev;
	}, {})).toEqual({
		'a': obj,
		'b': obj,
		'c': obj,
	});
	
	expect(transform(obj, (prev, value, index, arr, other) => {
		prev.push(other);
		return prev;
	}, [])).toEqual([undefined, undefined, undefined]);
});

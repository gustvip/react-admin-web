import reduce from '../index';

test('test reduce array', () => {
	const mockCallback = jest.fn();
	const obj = [1, 2, 3];
	expect(reduce([])).toBeUndefined();
	expect(reduce([], mockCallback)).toBeUndefined();
	expect(reduce({}, mockCallback)).toBeUndefined();
	expect(reduce(null, mockCallback)).toBeUndefined();
	expect(reduce('', mockCallback)).toBeUndefined();
	expect(reduce(obj, (prev, value, index, arr) => {})).toBeUndefined();
	expect(reduce([], (prev, value, index, arr) => {}, 1)).toBe(1);
	
	expect(reduce(obj, (prev, value) => {
		return prev += value;
	}, 0)).toBe(6);
	expect(reduce(obj, (prev, value) => {
		prev.push(value);
		return prev;
	}, [])).toEqual([1, 2, 3]);
	expect(reduce(obj, (prev, value, index) => {
		prev.push(index);
		return prev;
	}, [])).toEqual([0, 1, 2]);
	expect(reduce(obj, (prev, value, index, arr) => {
		prev.push(arr);
		return prev;
	}, [])).toEqual([obj, obj, obj]);
	expect(reduce(obj, (prev, value, index, arr, other) => {
		prev.push(other);
		return prev;
	}, [])).toEqual([undefined, undefined, undefined]);
});

test('test reduce object', () => {
	const obj = {
		a: 1,
		b: 2,
		c: 3,
	};
	
	expect(reduce(obj, (prev, value, index, arr) => {})).toBeUndefined();
	expect(reduce({}, (prev, value, index, arr) => {}, 1)).toBe(1);
	expect(reduce(obj, (prev, value) => {
		return prev += value;
	}, 0)).toBe(6);
	
	expect(reduce(obj, (prev, value, key) => {
		prev[key] = value;
		return prev;
	}, {})).toEqual({
		'a': 1,
		'b': 2,
		'c': 3,
	});
	
	expect(reduce(obj, (prev, value, key) => {
		prev[value] = key;
		return prev;
	}, {})).toEqual({
		'1': 'a',
		'2': 'b',
		'3': 'c',
	});
	
	expect(reduce(obj, (prev, value, key, obj) => {
		prev[key] = obj;
		return prev;
	}, {})).toEqual({
		'a': obj,
		'b': obj,
		'c': obj,
	});
	
	expect(reduce(obj, (prev, value, index, arr, other) => {
		prev.push(other);
		return prev;
	}, [])).toEqual([undefined, undefined, undefined]);
});

import flattenDeep from '../index';

test('test flattenDeep', () => {
	expect(flattenDeep('')).toEqual([]);
	expect(flattenDeep([])).toEqual([]);
	expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3]);
	expect(flattenDeep([1, 2, [3]])).toEqual([1, 2, 3]);
	expect(flattenDeep([1, 2, [3]])).toEqual([1, 2, 3]);
	expect(flattenDeep([1, 2, [3, 4]])).toEqual([1, 2, 3, 4]);
	expect(flattenDeep([1, 2, [3, [4]]])).toEqual([1, 2, 3, 4]);
	expect(flattenDeep([1, 2, [3, [4, [[[[[5]]]]]]]])).toEqual([1, 2, 3, 4,5]);
});


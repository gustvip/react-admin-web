import flatten from '../index';

test('test flatten', () => {
	expect(flatten('')).toEqual([]);
	expect(flatten([])).toEqual([]);
	expect(flatten([1, 2, 3])).toEqual([1, 2, 3]);
	expect(flatten([1, 2, [3]])).toEqual([1, 2, 3]);
	expect(flatten([1, 2, [3]])).toEqual([1, 2, 3]);
	expect(flatten([1, 2, [3, 4]])).toEqual([1, 2, 3, 4]);
	expect(flatten([1, 2, [3, [4]]])).toEqual([1, 2, 3, [4]]);
});


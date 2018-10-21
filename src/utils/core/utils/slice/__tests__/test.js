import slice from '../index';

test('test slice', () => {
	const obj = ['a', 'b', 'c'];
	expect(slice([])).toEqual([]);
	expect(slice('')).toEqual([]);
	expect(slice({})).toEqual([]);
	expect(slice([], null, null)).toEqual([]);
	expect(slice(obj)).toEqual(obj);
	expect(slice(obj, null)).toEqual(obj);
	expect(slice(obj, 0)).toEqual(obj);
	expect(slice(obj, 1)).toEqual(['b', 'c']);
	expect(slice(obj, 2)).toEqual(['c']);
	expect(slice(obj, 3)).toEqual([]);
	expect(slice(obj, 0, 0)).toEqual([]);
	expect(slice(obj, 0, 1)).toEqual(['a']);
	expect(slice(obj, 0, 2)).toEqual(['a', 'b']);
	expect(slice(obj, 0, 3)).toEqual(obj);
	expect(slice(obj, -3, -2)).toEqual(['a']);
	expect(slice(obj, -2, -3)).toEqual([]);
});

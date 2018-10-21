import lastIndexOf from '../index';

test('test lastIndexOf', () => {
	const str1 = '';
	const array1 = [];
	const array2 = ['a', 'b', 'c'];
	const array3 = ['a', NaN];
	expect(lastIndexOf(str1, 1, 99)).toBe(-1);
	expect(lastIndexOf(array1, 1)).toBe(-1);
	expect(lastIndexOf(str1, null, 99)).toBe(-1);
	expect(lastIndexOf(array2, 'b', -1)).toBe(1);
	expect(lastIndexOf(array2, 'b')).toBe(1);
	expect(lastIndexOf(array2, 'b', 0)).toBe(-1);
	expect(lastIndexOf(array2, 'b', 1)).toBe(1);
	expect(lastIndexOf(array2, 'b', 2)).toBe(1);
	expect(lastIndexOf(array2, 'b', 3)).toBe(-1);
	expect(lastIndexOf(array2, 'b', 4)).toBe(1);
	expect(lastIndexOf(array3, NaN, 4)).toBe(1);
});

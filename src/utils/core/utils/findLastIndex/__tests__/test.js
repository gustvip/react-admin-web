import findLastIndex from '../index';

test('test findLastIndex', () => {
	const str1 = '';
	const array1 = [];
	const array2 = ['a', 'b', 'c'];
	expect(findLastIndex(str1, function() {}, 99)).toBe(-1);
	expect(findLastIndex(array1, function() {})).toBe(-1);
	expect(findLastIndex(str1, null, 99)).toBe(-1);
	expect(findLastIndex(array2, (value) => {
		return value === 'b';
	}, -1)).toBe(1);
	expect(findLastIndex(array2, (value) => {
		return value === 'b';
	})).toBe(1);
	expect(findLastIndex(array2, (value) => {
		return value === 'b';
	}, 0)).toBe(-1);
	expect(findLastIndex(array2, (value) => {
		return value === 'b';
	}, 1)).toBe(1);
	expect(findLastIndex(array2, (value) => {
		return value === 'b';
	}, 2)).toBe(1);
	expect(findLastIndex(array2, (value) => {
		return value === 'b';
	}, 3)).toBe(-1);
	expect(findLastIndex(array2, (value) => {
		return value === 'b';
	}, 4)).toBe(1);
});

import includes from '../index';

test('test includes', () => {
	const str1 = '';
	const array1 = [];
	const array2 = ['a', 'b', 'c'];
	const array3 = ['a', NaN];
	expect(includes(str1, 1, 99)).toBeFalsy();
	expect(includes(array1, 1)).toBeFalsy();
	expect(includes(array2, 'b', -1)).toBeFalsy();
	expect(includes(array2, 'b', -2)).toBeTruthy();
	expect(includes(array2, 'b')).toBeTruthy();
	expect(includes(array2, 'b', 0)).toBeTruthy();
	expect(includes(array2, 'b', 1)).toBeTruthy();
	expect(includes(array2, 'b', 2)).toBeFalsy();
	expect(includes(array2, 'b', 3)).toBeTruthy();
	expect(includes(array2, 'b', 4)).toBeTruthy();
	expect(includes(array3, NaN, 4)).toBeTruthy();
});

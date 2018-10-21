import isArrayLike from '../index';

test('test isArrayLike', () => {
	expect(isArrayLike(1)).toBeFalsy();
	expect(isArrayLike(() => {

	})).toBeFalsy();
	expect(isArrayLike('aa')).toBeTruthy();
});

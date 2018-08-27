import isArrayLike from '../index';

test('test isArrayLike', () => {
	expect(isArrayLike(1)).toBeFalsy();
	expect(isArrayLike(function () {
		
	})).toBeFalsy();
	expect(isArrayLike('aa')).toBeTruthy();
});

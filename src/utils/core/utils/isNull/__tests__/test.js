import isNull from '../index';

test('test isNull', () => {
	expect(isNull(null)).toBeTruthy();
	expect(isNull('')).toBeFalsy();
});

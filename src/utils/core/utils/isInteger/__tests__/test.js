import isInteger from '../index';

test('test isInteger', () => {
	expect(isInteger(NaN)).toBeFalsy();
	expect(isInteger(1.1)).toBeFalsy();
	expect(isInteger(-1)).toBeTruthy();
	expect(isInteger(Infinity)).toBeFalsy();
});

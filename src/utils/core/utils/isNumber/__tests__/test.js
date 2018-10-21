import isNumber from '../index';

test('test isNumber', () => {
	expect(isNumber({})).toBeFalsy();
	/* eslint-disable no-new-wrappers */
	expect(isNumber(new Number(1))).toBeFalsy();
	expect(isNumber(1)).toBeTruthy();
});

import isString from '../index';

test('test isString', () => {
	expect(isString({})).toBeFalsy();
	/* eslint-disable no-new-wrappers */
	expect(isString(new String('111'))).toBeFalsy();
	expect(isString('1')).toBeTruthy();
});

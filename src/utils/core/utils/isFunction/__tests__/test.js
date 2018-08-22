import isFunction from '../index';

test('test isFunction', () => {
	expect(isFunction(function () {})).toBeTruthy();
	expect(isFunction('')).toBeFalsy();
});

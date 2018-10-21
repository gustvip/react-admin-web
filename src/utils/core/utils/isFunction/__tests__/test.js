import isFunction from '../index';

test('test isFunction', () => {
	expect(isFunction(() => {})).toBeTruthy();
	expect(isFunction(async () => {})).toBeTruthy();
	expect(isFunction(function* () {})).toBeTruthy();
	expect(isFunction(Proxy)).toBeTruthy();
	expect(isFunction('')).toBeFalsy();
});

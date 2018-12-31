import isObject from '../index';

test('test isObject', () => {
	expect(isObject({})).toBeTruthy();
	expect(isObject(new Map())).toBeFalsy();
});

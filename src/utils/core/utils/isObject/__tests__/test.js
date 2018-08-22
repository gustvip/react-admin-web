import isObject from '../index';

test('test isObject', () => {
	expect(isObject(function () {})).toBeFalsy();
	expect(isObject([])).toBeFalsy();
	expect(isObject(null)).toBeFalsy();
	expect(isObject(Object.create(null))).toBeTruthy();
	expect(isObject({})).toBeTruthy();
});

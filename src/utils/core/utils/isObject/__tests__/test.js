import isObject from '../index';

test('test isObject', () => {
	expect(isObject(() => {})).toBeTruthy();
	expect(isObject([])).toBeTruthy();
	expect(isObject(null)).toBeFalsy();
	expect(isObject(Object.create(null))).toBeTruthy();
	expect(isObject({})).toBeTruthy();
});

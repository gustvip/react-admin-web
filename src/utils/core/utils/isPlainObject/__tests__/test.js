import isPlainObject from '../index';

test('test isObjectLike', () => {
	expect(isPlainObject([])).toBeFalsy();
	expect(isPlainObject(null)).toBeFalsy();
	expect(isPlainObject({})).toBeTruthy();
	expect(isPlainObject(Object.create(null))).toBeTruthy();
});

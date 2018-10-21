import isObjectLike from '../index';

test('test isObjectLike', () => {
	expect(isObjectLike(() => {})).toBeFalsy();
	expect(isObjectLike([])).toBeTruthy();
	expect(isObjectLike(null)).toBeFalsy();
	expect(isObjectLike(Object.create(null))).toBeTruthy();
	expect(isObjectLike({})).toBeTruthy();
});

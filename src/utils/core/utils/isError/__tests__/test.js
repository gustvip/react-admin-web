import isError from '../index';

test('test isError', () => {
	expect(isError({})).toBeFalsy();
	expect(isError(new Error('1'))).toBeTruthy();
});

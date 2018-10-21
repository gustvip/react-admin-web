import isArguments from '../index';

test('test isArguments', () => {
	expect(isArguments({})).toBeFalsy();
	expect(isArguments(arguments)).toBeTruthy();
});

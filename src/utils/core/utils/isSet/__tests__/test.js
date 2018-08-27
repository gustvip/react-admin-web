import isSet from '../index';

test('test isSet', () => {
	expect(isSet(function () {})).toBeFalsy();
	expect(isSet(new Set())).toBeTruthy();
});

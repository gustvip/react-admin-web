import isMap from '../index';

test('test isMap', () => {
	expect(isMap(function () {})).toBeFalsy();
	expect(isMap(new Map)).toBeTruthy();
});

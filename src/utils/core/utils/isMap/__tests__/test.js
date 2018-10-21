import isMap from '../index';

test('test isMap', () => {
	expect(isMap({})).toBeFalsy();
	expect(isMap(new Map())).toBeTruthy();
});

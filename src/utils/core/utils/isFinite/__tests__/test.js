import IsFinite from '../index';

test('test IsFinite', () => {
	expect(IsFinite({})).toBeFalsy();
	expect(IsFinite(1)).toBeTruthy();
	expect(IsFinite('1')).toBeFalsy();
});

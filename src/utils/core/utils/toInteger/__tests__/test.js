import toFinite from '../index';

test('test toFinite', () => {
	expect(toFinite(function () {})).toBe(0);
	expect(toFinite(Infinity)).toBe(1.7976931348623157e+308);
	expect(toFinite(-Infinity)).toBe(-1.7976931348623157e+308);
	expect(toFinite('3')).toBe(3);
});

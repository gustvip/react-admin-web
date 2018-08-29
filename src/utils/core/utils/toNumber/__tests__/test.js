import toNumber from '../index';

test('test toNumber', () => {
	expect(toNumber({a:1})).toBe(NaN);
	expect(toNumber(function () {
	
	})).toBe(NaN);
	expect(toNumber([])).toBe(0);
	expect(toNumber([1, 2])).toBe(NaN);
	expect(toNumber({valueOf: function () {return 10;}})).toBe(10);
	expect(toNumber(1)).toBe(1);
	expect(toNumber('-111')).toBe(-111);
	expect(toNumber(false)).toBe(0);
	expect(toNumber(true)).toBe(1);
});

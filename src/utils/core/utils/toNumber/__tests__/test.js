import toNumber from '../index';

test('test toNumber', () => {
	var a = {a: '1'};
	expect(toNumber(a)).toBe(NaN);
	expect(toNumber(function () {
	
	})).toBe(NaN);
	expect(toNumber([])).toBe(NaN);
	expect(toNumber({})).toBe(NaN);
	expect(toNumber(1)).toBe(1);
	expect(toNumber('0b01')).toBe(1);
	expect(toNumber('0o01')).toBe(1);
	expect(toNumber('0001')).toBe(1);
	expect(toNumber('0x1f')).toBe(31);
	expect(toNumber(false)).toBe(0);
});

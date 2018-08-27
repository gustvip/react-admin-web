import casrArray from '../index';

test('test casrArray', () => {
	expect(casrArray()).toEqual([]);
	expect(casrArray(1)).toEqual([1]);
	expect(casrArray([1, 2])).toEqual([1, 2]);
});

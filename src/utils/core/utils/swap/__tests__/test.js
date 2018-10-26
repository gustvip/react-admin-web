import swap from '../index';

test('test swap', () => {
	expect(swap([0, 1, 2], 0, 1)).toEqual([1, 0, 2]);
	expect(swap([0, 1, 2], 0, 2)).toEqual([2, 1, 0]);
});

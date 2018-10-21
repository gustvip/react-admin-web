import entries from '../index';

test('test entries', () => {
	expect(entries({})).toEqual([]);
	expect(entries([])).toEqual([]);
	expect(entries(null)).toEqual([]);
	expect(entries(undefined)).toEqual([]);
	expect(entries('123')).toEqual([[0, '1'], [1, '2'], [2, '3']]);
	expect(entries([1, 2, 3])).toEqual([[0, 1], [1, 2], [2, 3]]);
	
	expect(entries({
		a: 1,
		b: 2,
		c: 3,
	})).toContainEqual(['a', 1]);
	expect(entries({
		a: 1,
		b: 2,
		c: 3,
	})).toContainEqual(['b', 2]);
	expect(entries({
		a: 1,
		b: 2,
		c: 3,
	})).toContainEqual(['c', 3]);
});


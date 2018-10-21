import keys from '../index';

test('test keys', () => {
	expect(keys({})).toEqual([]);
	expect(keys([])).toEqual([]);
	expect(keys(null)).toEqual([]);
	expect(keys(undefined)).toEqual([]);
	expect(keys('123')).toEqual([0, 1, 2]);
	expect(keys([1, 2, 3])).toEqual([0, 1, 2]);
	
	expect(keys({
		a: 1,
		b: 2,
		c: 2,
	})).toContainEqual('a');
	expect(keys({
		a: 1,
		b: 2,
		c: 2,
	})).toContainEqual('b');
	expect(keys({
		a: 1,
		b: 2,
		c: 2,
	})).toContainEqual('c');
});


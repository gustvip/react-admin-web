import fill from '../index';

test('test fill', () => {
	expect(fill([], 1)).toEqual([]);
	expect(fill('')).toEqual('');
	expect(fill({})).toEqual({});
	expect(fill([], 1, 0)).toEqual([]);
	expect(fill([], 1, 0, 1)).toEqual([]);
	
	expect(fill(['a', 'b', 'c'])).toEqual([undefined, undefined, undefined]);
	expect(fill(['a', 'b', 'c'], null)).toEqual([null, null, null]);
	
	expect(fill(['a', 'b', 'c'], 0)).toEqual([0, 0, 0]);
	expect(fill(['a', 'b', 'c'], 0, 0)).toEqual([0, 0, 0]);
	expect(fill(['a', 'b', 'c'], 0, 1)).toEqual(['a', 0, 0]);
	expect(fill(['a', 'b', 'c'], 0, 2)).toEqual(['a', 'b', 0]);
	expect(fill(['a', 'b', 'c'], 0, 3)).toEqual(['a', 'b', 'c']);
	
	expect(fill(['a', 'b', 'c'], 0, 0, 0)).toEqual(['a', 'b', 'c']);
	expect(fill(['a', 'b', 'c'], 0, 0, 1)).toEqual([0, 'b', 'c']);
	expect(fill(['a', 'b', 'c'], 0, 0, 2)).toEqual([0, 0, 'c']);
	expect(fill(['a', 'b', 'c'], 0, 0, 3)).toEqual([0, 0, 0]);
	expect(fill(['a', 'b', 'c'], 0, 0, 4)).toEqual([0, 0, 0]);
	expect(fill(['a', 'b', 'c'], 0, 1, 2)).toEqual(['a', 0, 'c']);
	expect(fill(['a', 'b', 'c'], 0, 2, 3)).toEqual(['a', 'b', 0]);
	expect(fill(['a', 'b', 'c'], 0, 2, 4)).toEqual(['a', 'b', 0]);
	
	expect(fill(['a', 'b', 'c'], 0, -1)).toEqual(['a', 'b', 0]);
	expect(fill(['a', 'b', 'c'], 0, -2)).toEqual(['a', 0, 0]);
	expect(fill(['a', 'b', 'c'], 0, -3)).toEqual([0, 0, 0]);
	expect(fill(['a', 'b', 'c'], 0, -4)).toEqual([0, 0, 0]);
	
	expect(fill(['a', 'b', 'c'], 0, 0, -1)).toEqual([0, 0, 'c']);
	expect(fill(['a', 'b', 'c'], 0, 0, -2)).toEqual([0, 'b', 'c']);
	expect(fill(['a', 'b', 'c'], 0, 0, -3)).toEqual(['a', 'b', 'c']);
	expect(fill(['a', 'b', 'c'], 0, 0, -4)).toEqual(['a', 'b', 'c']);
	
	expect(fill(['a', 'b', 'c'], 0, -3, -3)).toEqual(['a', 'b', 'c']);
	expect(fill(['a', 'b', 'c'], 0, -3, -2)).toEqual([0, 'b', 'c']);
	expect(fill(['a', 'b', 'c'], 0, -3, -1)).toEqual([0, 0, 'c']);
	expect(fill(['a', 'b', 'c'], 0, -2, -1)).toEqual(['a', 0, 'c']);
});

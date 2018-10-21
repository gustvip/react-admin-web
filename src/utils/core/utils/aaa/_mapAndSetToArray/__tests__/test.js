import _mapAndSetToArray from '../index';

test('test _mapAndSetToArray', () => {
	const _map = new Map();
	_map.set('a', 1);
	_map.set('b', 2);
	expect(_mapAndSetToArray(_map)).toEqual([1, 2]);
	
	const _set = new Set();
	_set.add(1);
	_set.add(2);
	expect(_mapAndSetToArray(_set)).toEqual([1, 2]);
});

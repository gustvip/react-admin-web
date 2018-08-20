/**
 * Created by joey on 2018/8/20
 */
import Map from '../map';

const mockCallback = jest.fn();
const key1 = {name: 'a'};
const value1 = {name: 'b'};
const map = Map([[key1, value1]]);
const _map = new Map([[key1, value1]]);

test('map test', () => {
	expect(_map).toEqual(map);
	expect(_map.__data__).toEqual([{key: key1, value: value1}]);
	expect(_map.remove(2)).toEqual(_map);
	expect(_map.clear()).toEqual(_map);
	expect(_map.__data__).toEqual([]);
	expect(_map.size).toBe(0);
	_map.forEach(mockCallback);
	expect(mockCallback.mock.calls.length).toBe(0);
	
	expect(_map.add(key1, value1)).toEqual(_map);
	expect(_map.__data__).toEqual([{key: key1, value: value1}]);
	expect(_map.size).toBe(1);
	expect(_map.has(key1)).toBe(true);
	expect(_map.has(2)).toBe(false);
	expect(_map.get(key1)).toEqual(value1);
	expect(_map.keys).toEqual([key1]);
	expect(_map.values).toEqual([value1]);
	expect(_map.entries).toEqual([[key1, value1]]);
	expect(_map.forEach(mockCallback)).toEqual(_map);
	expect(mockCallback.mock.calls.length).toBe(1);
	expect(mockCallback.mock.calls[0][0]).toEqual(value1);
	expect(mockCallback.mock.calls[0][1]).toEqual(key1);
	expect(mockCallback.mock.results[0].value).toBeUndefined();
	
	_map.add(key1, value1);
	expect(_map.__data__).toEqual([{key: key1, value: value1}]);
	expect(_map.size).toBe(1);
	expect(_map.has(key1)).toBe(true);
	expect(_map.has(2)).toBe(false);
	expect(_map.get(key1)).toEqual(value1);
	expect(_map.keys).toEqual([key1]);
	expect(_map.values).toEqual([value1]);
	expect(_map.entries).toEqual([[key1, value1]]);
	expect(_map.forEach(mockCallback)).toEqual(_map);
	expect(mockCallback.mock.calls.length).toBe(2);
	expect(mockCallback.mock.calls[1][0]).toEqual(value1);
	expect(mockCallback.mock.calls[1][1]).toEqual(key1);
	
	_map.add(value1, key1);
	expect(_map.__data__).toEqual([{key: key1, value: value1}, {key: value1, value: key1}]);
	expect(_map.size).toBe(2);
	expect(_map.has(key1)).toBe(true);
	expect(_map.has(value1)).toBe(true);
	expect(_map.get(key1)).toEqual(value1);
	expect(_map.get(value1)).toEqual(key1);
	expect(_map.keys).toEqual([key1, value1]);
	expect(_map.values).toEqual([value1, key1]);
	expect(_map.entries).toEqual([[key1, value1], [value1, key1]]);
	expect(_map.forEach(mockCallback)).toEqual(_map);
	expect(mockCallback.mock.calls.length).toBe(4);
	expect(mockCallback.mock.calls[2][0]).toEqual(value1);
	expect(mockCallback.mock.calls[2][1]).toEqual(key1);
	expect(mockCallback.mock.calls[3][0]).toEqual(key1);
	expect(mockCallback.mock.calls[3][1]).toEqual(value1);
	
	_map.clear();
	expect(_map.__data__).toEqual([]);
	expect(_map.size).toBe(0);
	expect(_map.has(key1)).toBe(false);
	expect(_map.has(value1)).toBe(false);
	expect(_map.get(key1)).toBeUndefined();
	expect(_map.get(value1)).toBeUndefined();
	expect(_map.keys).toEqual([]);
	expect(_map.values).toEqual([]);
	expect(_map.entries).toEqual([]);
});

/**
 * Created by joey on 2018/8/20
 */
import Map from "../index";

const mockCallback = jest.fn();
const key1 = {name: "a"};
const value1 = {name: "b"};
const map = Map([[key1, value1]]);
const _map = new Map(map);
const map3 = new Map("");
const map4 = new Map([1, 2, 3]);
test("map test", () => {
	expect(_map).toEqual(map);
	expect(map4.size).toBe(0);
	expect(_map.size).toBe(1);
	expect(map3.keys()).toEqual([]);
	expect(_map.keys()).toEqual([key1]);
	expect(_map.values()).toEqual([value1]);
	expect(_map.delete(2)).toEqual(_map);
	expect(_map.clear()).toEqual(_map);
	expect(_map.keys()).toEqual([]);
	expect(_map.size).toBe(0);
	_map.forEach(mockCallback);
	expect(mockCallback.mock.calls.length).toBe(0);
	
	expect(_map.set(key1, value1)).toEqual(_map);
	expect(_map.keys()).toEqual([key1]);
	expect(_map.values()).toEqual([value1]);
	expect(_map.size).toBe(1);
	expect(_map.has(key1)).toBe(true);
	expect(_map.has(2)).toBe(false);
	expect(_map.get(key1)).toEqual(value1);
	expect(_map.keys()).toEqual([key1]);
	expect(_map.values()).toEqual([value1]);
	expect(_map.entries()).toEqual([[key1, value1]]);
	expect(_map.forEach(mockCallback)).toEqual(_map);
	expect(mockCallback.mock.calls.length).toBe(1);
	expect(mockCallback.mock.calls[0][0]).toEqual(value1);
	expect(mockCallback.mock.calls[0][1]).toEqual(key1);
	expect(mockCallback.mock.results[0].value).toBeUndefined();
	
	_map.set(key1, value1);
	expect(_map.keys()).toEqual([key1]);
	expect(_map.values()).toEqual([value1]);
	expect(_map.size).toBe(1);
	expect(_map.has(key1)).toBe(true);
	expect(_map.has(2)).toBe(false);
	expect(_map.get(key1)).toEqual(value1);
	expect(_map.keys()).toEqual([key1]);
	expect(_map.values()).toEqual([value1]);
	expect(_map.entries()).toEqual([[key1, value1]]);
	expect(_map.forEach(mockCallback)).toEqual(_map);
	expect(mockCallback.mock.calls.length).toBe(2);
	expect(mockCallback.mock.calls[1][0]).toEqual(value1);
	expect(mockCallback.mock.calls[1][1]).toEqual(key1);
	
	_map.set(value1, key1);
	expect(_map.keys()).toEqual([key1, value1]);
	expect(_map.values()).toEqual([value1, key1]);
	expect(_map.size).toBe(2);
	expect(_map.has(key1)).toBe(true);
	expect(_map.has(value1)).toBe(true);
	expect(_map.get(key1)).toEqual(value1);
	expect(_map.get(value1)).toEqual(key1);
	expect(_map.keys()).toEqual([key1, value1]);
	expect(_map.values()).toEqual([value1, key1]);
	expect(_map.entries()).toEqual([[key1, value1], [value1, key1]]);
	expect(_map.forEach(mockCallback)).toEqual(_map);
	expect(mockCallback.mock.calls.length).toBe(4);
	expect(mockCallback.mock.calls[2][0]).toEqual(value1);
	expect(mockCallback.mock.calls[2][1]).toEqual(key1);
	expect(mockCallback.mock.calls[3][0]).toEqual(key1);
	expect(mockCallback.mock.calls[3][1]).toEqual(value1);
	_map.delete("aaa");
	expect(_map.keys()).toEqual([key1, value1]);
	expect(_map.values()).toEqual([value1, key1]);
	_map.delete(key1);
	expect(_map.keys()).toEqual([value1]);
	expect(_map.values()).toEqual([key1]);
	
	_map.clear();
	expect(_map.keys()).toEqual([]);
	expect(_map.values()).toEqual([]);
	expect(_map.size).toBe(0);
	expect(_map.has(key1)).toBe(false);
	expect(_map.has(value1)).toBe(false);
	expect(_map.get(key1)).toBeUndefined();
	expect(_map.get(value1)).toBeUndefined();
	expect(_map.keys()).toEqual([]);
	expect(_map.values()).toEqual([]);
	expect(_map.entries()).toEqual([]);
});

test("test undefined", () => {
	const map5 = Map();
	map5.set(undefined,undefined);
	expect(map5.size).toBe(1);
	expect(map5.has(undefined)).toBe(true);
	expect(map5.values()).toEqual([undefined]);
	expect(map5.entries()).toEqual([[undefined, undefined]]);
});

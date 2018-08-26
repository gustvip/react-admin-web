/**
 * Created by joey on 2018/8/20
 */
import Set from '../index';

const mockCallback = jest.fn();
const value1 = {name: 'a'};
const value2 = {name: 'b'};
const set1 = Set([value1]);
const set2 = new Set(set1);
const set3 = new Set('');
test('map test', () => {
	expect(set3.values).toEqual([]);
	expect(set1).toEqual(set2);
	expect(set1.size).toBe(1);
	expect(set1.values).toEqual([value1]);
	expect(set1.remove(2)).toEqual(set1);
	expect(set1.clear()).toEqual(set1);
	expect(set1.size).toBe(0);
	set1.forEach(mockCallback);
	expect(mockCallback.mock.calls.length).toBe(0);
	
	expect(set1.add(value1)).toEqual(set1);
	expect(set1.values).toEqual([value1]);
	expect(set1.size).toBe(1);
	expect(set1.has(value1)).toBe(true);
	expect(set1.has(2)).toBe(false);
	expect(set1.entries).toEqual([[value1, value1]]);
	expect(set1.forEach(mockCallback)).toEqual(set1);
	expect(mockCallback.mock.calls.length).toBe(1);
	expect(mockCallback.mock.calls[0][0]).toEqual(value1);
	expect(mockCallback.mock.calls[0][1]).toEqual(value1);
	expect(mockCallback.mock.results[0].value).toBeUndefined();
	
	set1.add(value1);
	expect(set1.values).toEqual([value1]);
	expect(set1.size).toBe(1);
	expect(set1.has(value1)).toBe(true);
	expect(set1.has(2)).toBe(false);
	expect(set1.values).toEqual([value1]);
	expect(set1.entries).toEqual([[value1, value1]]);
	expect(set1.forEach(mockCallback)).toEqual(set1);
	expect(mockCallback.mock.calls.length).toBe(2);
	expect(mockCallback.mock.calls[1][0]).toEqual(value1);
	expect(mockCallback.mock.calls[1][1]).toEqual(value1);
	
	set1.add(value2);
	expect(set1.values).toEqual([value1, value2]);
	expect(set1.size).toBe(2);
	expect(set1.has(value2)).toBe(true);
	expect(set1.has(value1)).toBe(true);
	expect(set1.values).toEqual([value1, value2]);
	expect(set1.entries).toEqual([[value1, value1], [value2, value2]]);
	expect(set1.forEach(mockCallback)).toEqual(set1);
	expect(mockCallback.mock.calls.length).toBe(4);
	expect(mockCallback.mock.calls[2][0]).toEqual(value1);
	expect(mockCallback.mock.calls[2][1]).toEqual(value1);
	expect(mockCallback.mock.calls[3][0]).toEqual(value2);
	expect(mockCallback.mock.calls[3][1]).toEqual(value2);
	set1.remove('aaa');
	expect(set1.values).toEqual([value1, value2]);
	set1.remove(value1);
	expect(set1.size).toBe(1);
	expect(set1.values).toEqual([value2]);
	
	set1.clear();
	expect(set1.values).toEqual([]);
	expect(set1.size).toBe(0);
	expect(set1.has(value2)).toBe(false);
	expect(set1.has(value1)).toBe(false);
	expect(set1.values).toEqual([]);
	expect(set1.entries).toEqual([]);
});

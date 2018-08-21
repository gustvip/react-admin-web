/**
 * Created by joey on 2018/8/20
 */
import findIndex from '../findIndex';
import isFunction from '../isFunction';
import isObject from '../isObject';
import isArray from '../isArray';
import forOwn from '../forOwn';

test('test isFunction', () => {
	expect(isFunction(function () {})).toBeTruthy();
	expect(isFunction('')).toBeFalsy();
});

test('test isObject', () => {
	expect(isObject(function () {})).toBeFalsy();
	expect(isObject([])).toBeFalsy();
	expect(isObject(null)).toBeFalsy();
	expect(isObject(Object.create(null))).toBeTruthy();
	expect(isObject({})).toBeTruthy();
});

test('test isArray', () => {
	expect(isArray({})).toBeFalsy();
	expect(isArray([])).toBeTruthy();
});

test('test findIndex', () => {
	const mockCallback = jest.fn();
	const str1 = '';
	const str2 = 'ab';
	const array1 = [];
	const array2 = ['a', 'b'];
	
	expect(findIndex(str1, mockCallback)).toBe(-1);
	expect(() => {
		findIndex(str1);
	}).toThrow();
	
	expect(findIndex(str1, mockCallback)).toBe(-1);
	expect(mockCallback.mock.calls.length).toBe(0);
	expect(findIndex(array1, mockCallback)).toBe(-1);
	expect(mockCallback.mock.calls.length).toBe(0);
	
	expect(findIndex(str2, mockCallback)).toBe(-1);
	expect(mockCallback.mock.calls.length).toBe(2);
	expect(mockCallback.mock.calls[0][0]).toBe('a');
	expect(mockCallback.mock.calls[0][1]).toBe(0);
	expect(mockCallback.mock.calls[0][2]).toBe(str2);
	expect(mockCallback.mock.calls[0][3]).toBeUndefined();
	expect(mockCallback.mock.calls[1][0]).toBe('b');
	expect(mockCallback.mock.calls[1][1]).toBe(1);
	expect(mockCallback.mock.calls[1][2]).toBe(str2);
	expect(mockCallback.mock.calls[1][3]).toBeUndefined();
	
	expect(findIndex(array2, mockCallback)).toBe(-1);
	expect(mockCallback.mock.calls.length).toBe(4);
	expect(mockCallback.mock.calls[2][0]).toBe('a');
	expect(mockCallback.mock.calls[2][1]).toBe(0);
	expect(mockCallback.mock.calls[2][2]).toBe(array2);
	expect(mockCallback.mock.calls[2][3]).toBeUndefined();
	expect(mockCallback.mock.calls[3][0]).toBe('b');
	expect(mockCallback.mock.calls[3][1]).toBe(1);
	expect(mockCallback.mock.calls[3][2]).toBe(array2);
	expect(mockCallback.mock.calls[3][3]).toBeUndefined();
	
	expect(findIndex(array2, function (value) {
		return value === 'b';
	})).toBe(1);
	expect(findIndex(str2, function (value) {
		return value === 'b';
	})).toBe(1);
});

test('test forOwn', () => {
	const mockCallback = jest.fn();
	const obj = {key1: 'value1', key2: 'value2', key3: 'value3'};
	expect(forOwn({}, mockCallback)).toBeUndefined();
	expect(forOwn('', mockCallback)).toBeUndefined();
	expect(() => {
		forOwn(obj, 1);
	}).toThrow();
	
	mockCallback.mockReturnValueOnce(true).mockReturnValueOnce(false);
	forOwn(obj, mockCallback);
	expect(mockCallback.mock.calls.length).toBe(2);
	expect(mockCallback.mock.calls[0][0]).toBe('value1');
	expect(mockCallback.mock.calls[0][1]).toBe('key1');
	expect(mockCallback.mock.calls[0][2]).toEqual(obj);
	expect(mockCallback.mock.calls[0][3]).toBeUndefined();
	expect(mockCallback.mock.calls[1][0]).toBe('value2');
	expect(mockCallback.mock.calls[1][1]).toBe('key2');
	expect(mockCallback.mock.calls[1][2]).toEqual(obj);
	expect(mockCallback.mock.calls[1][3]).toBeUndefined();
});

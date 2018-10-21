import forEach from '../index';

test('test forEach', () => {
	const mockCallback = jest.fn();
	/* eslint-disable no-extend-native */
	Object.prototype.aaaaaaaaaaaaaaaaaaaaaaaa = 'aaa';
	const obj = { key1: 'value1', key2: 'value2', key3: 'value3' };
	expect(forEach({}, mockCallback)).toBeUndefined();
	expect(forEach(null, mockCallback)).toBeUndefined();
	expect(forEach({})).toBeUndefined();
	expect(forEach()).toBeUndefined();
	expect(forEach('', mockCallback)).toBeUndefined();
	delete Object.prototype.aaaaaaaaaaaaaaaaaaaaaaaa;
	mockCallback.mockReturnValueOnce(true).mockReturnValueOnce(false);
	forEach(obj, mockCallback);
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

test('test forEach', () => {
	const mockCallback = jest.fn();
	const obj = ['a', 'b', 'c'];
	expect(forEach([], mockCallback)).toBeUndefined();
	mockCallback.mockReturnValueOnce(true).mockReturnValueOnce(false);
	forEach(obj, mockCallback);
	expect(mockCallback.mock.calls.length).toBe(2);
	expect(mockCallback.mock.calls[0][0]).toBe('a');
	expect(mockCallback.mock.calls[0][1]).toBe(0);
	expect(mockCallback.mock.calls[0][2]).toEqual(obj);
	expect(mockCallback.mock.calls[0][3]).toBeUndefined();
	expect(mockCallback.mock.calls[1][0]).toBe('b');
	expect(mockCallback.mock.calls[1][1]).toBe(1);
	expect(mockCallback.mock.calls[1][2]).toEqual(obj);
	expect(mockCallback.mock.calls[1][3]).toBeUndefined();
});

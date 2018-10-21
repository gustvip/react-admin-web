import _objectForEach from '../index';

test('test _objectForEach', () => {
	const mockCallback = jest.fn();
	const obj = ['a', 'b', 'c'];
	expect(_objectForEach([], mockCallback)).toBeUndefined();
	mockCallback.mockReturnValueOnce(true).mockReturnValueOnce(false);
	_objectForEach(obj, mockCallback);
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

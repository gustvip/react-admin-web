import filter from '../index';

test('test filter', () => {
	const mockCallback = jest.fn();
	const obj = ['a', 'b', 'c'];
	expect(filter([], mockCallback)).toEqual([]);
	expect(filter('', mockCallback)).toEqual([]);
	expect(filter('')).toEqual([]);
	mockCallback.mockReturnValueOnce(true).mockReturnValueOnce(true).mockReturnValueOnce(false);
	const data = filter(obj, mockCallback);
	expect(data).toEqual(['a', 'b']);
});

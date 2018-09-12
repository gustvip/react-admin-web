import findIndex from '../index';

test('test findIndex', () => {
  const mockCallback = jest.fn();
  const str1 = '';
  const str2 = 'ab';
  const array1 = [];
  const array2 = ['a', 'b'];

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

  expect(findIndex(array2, (value) => {
    return value === 'b';
  })).toBe(1);
  expect(findIndex(str2, (value) => {
    return value === 'b';
  })).toBe(1);
});

import isBoolean from '../index';

test('test isBoolean', () => {
  expect(isBoolean({})).toBeFalsy();
  expect(isBoolean(new Boolean(true))).toBeFalsy();
  expect(isBoolean(true)).toBeTruthy();
  expect(isBoolean(false)).toBeTruthy();
});

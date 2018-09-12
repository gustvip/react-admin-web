import isNil from '../index';

test('test isNil', () => {
  expect(isNil(undefined)).toBeTruthy();
  expect(isNil(null)).toBeTruthy();
  expect(isNil('')).toBeFalsy();
});

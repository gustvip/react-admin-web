import isString from '../index';

test('test isString', () => {
  expect(isString({})).toBeFalsy();
  expect(isString(new String('111'))).toBeFalsy();
  expect(isString('1')).toBeTruthy();
});

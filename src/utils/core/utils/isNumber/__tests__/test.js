import isNumber from '../index';

test('test isNumber', () => {
  expect(isNumber({})).toBeFalsy();
  expect(isNumber(new Number(1))).toBeFalsy();
  expect(isNumber(1)).toBeTruthy();
});

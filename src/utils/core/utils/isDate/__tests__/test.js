import isDate from '../index';

test('test isDate', () => {
  expect(isDate({})).toBeFalsy();
  expect(isDate(new Date())).toBeTruthy();
});

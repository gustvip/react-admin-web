import toInteger from '../index';

test('test toInteger', () => {
  expect(toInteger({ a: 1 })).toBe(0);
  expect(toInteger(1.1)).toBe(1);
  expect(toInteger(() => {

  })).toBe(0);
  expect(toInteger([])).toBe(0);
  expect(toInteger([1, 2])).toBe(0);
  expect(toInteger({ valueOf() { return 10; } })).toBe(10);
  expect(toInteger(1)).toBe(1);
  expect(toInteger('-111')).toBe(-111);
  expect(toInteger(false)).toBe(0);
  expect(toInteger(true)).toBe(1);
  expect(toInteger(Infinity)).toBe(1.7976931348623157e+308);
  expect(toInteger(-Infinity)).toBe(-1.7976931348623157e+308);
});

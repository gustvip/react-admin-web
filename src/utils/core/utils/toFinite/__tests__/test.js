import toFinite from '../index';

test('test toFinite', () => {
  expect(toFinite({ a: 1 })).toBe(0);
  expect(toFinite(1.1)).toBe(1.1);
  expect(toFinite(() => {

  })).toBe(0);
  expect(toFinite([])).toBe(0);
  expect(toFinite([1, 2])).toBe(0);
  expect(toFinite({ valueOf() { return 10; } })).toBe(10);
  expect(toFinite(1)).toBe(1);
  expect(toFinite('-111')).toBe(-111);
  expect(toFinite(false)).toBe(0);
  expect(toFinite(true)).toBe(1);
  expect(toFinite(Infinity)).toBe(1.7976931348623157e+308);
  expect(toFinite(-Infinity)).toBe(-1.7976931348623157e+308);
});

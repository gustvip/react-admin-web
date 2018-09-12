import toLength from '../index';

test('test toLength', () => {
  expect(toLength({ a: 1 })).toBe(0);
  expect(toLength(1.1)).toBe(1);
  expect(toLength(-1.1)).toBe(0);
  expect(toLength(() => {

  })).toBe(0);
  expect(toLength([])).toBe(0);
  expect(toLength([1, 2])).toBe(0);
  expect(toLength({ valueOf() { return 10; } })).toBe(10);
  expect(toLength(1)).toBe(1);
  expect(toLength('-111')).toBe(0);
  expect(toLength(false)).toBe(0);
  expect(toLength(true)).toBe(1);
  expect(toLength(Infinity)).toBe(4294967295);
  expect(toLength(-Infinity)).toBe(0);
});

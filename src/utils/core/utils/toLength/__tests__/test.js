import toLength from '../index';

test('test toLength', () => {
	expect(toLength({})).toBe(0);
	expect(toLength(false)).toBe(0);
	expect(toLength(-5)).toBe(0);
	expect(toLength(5)).toBe(5);
	expect(toLength(Infinity)).toBe(4294967295);
});

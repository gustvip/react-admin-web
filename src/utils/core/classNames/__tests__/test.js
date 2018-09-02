import classNames from '../index';

test('classNames', () => {
	expect(classNames(null, undefined, false, 0, '')).toBe('');
	expect(classNames('1', 2)).toBe('1 2');
	expect(classNames('1', 2, [3])).toBe('1 2 3');
	expect(classNames('1', 2, [3], {'4': false})).toBe('1 2 3');
	expect(classNames('1', 2, [3], {'4': true})).toBe('1 2 3 4');
	expect(classNames('1', 2, [3], [], {'4': true})).toBe('1 2 3 4');
	expect(classNames('1', 2, [3], function () {}, {'4': true})).toBe('1 2 3 4');
});

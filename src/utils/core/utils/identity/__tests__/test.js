import identity from '../index';

test('test identity', () => {
	var a = {a: '1'};
	expect(identity(a)).toBe(a);
	expect(identity(1)).toBe(1);
});

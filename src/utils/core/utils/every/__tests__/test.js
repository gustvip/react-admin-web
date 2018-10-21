import every from '../index';

test('test every', () => {
	const mockCallback = jest.fn();
	const obj = [1, 2, 3];
	expect(every([], mockCallback)).toBeTruthy();
	expect(every('', mockCallback)).toBeTruthy();
	expect(every('')).toBeTruthy();
	
	expect(every(obj, x => x > 4)).toBeFalsy();
	expect(every(obj, x => x > 0)).toBeTruthy();
});

import isSymbol from '../index';

test('test isSymbol', () => {
	expect(isSymbol({})).toBeFalsy();
	expect(isSymbol(Symbol(1))).toBeTruthy();
});

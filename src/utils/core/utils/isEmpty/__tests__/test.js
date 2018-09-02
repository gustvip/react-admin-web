import isEmpty from '../index';

test('test isEmpty', () => {
	expect(isEmpty({key1: 'value1', key2: 'value2', key3: 'value3'})).toBeFalsy();
	expect(isEmpty({length: 0})).toBeFalsy();
	expect(isEmpty(null)).toBeTruthy();
	expect(isEmpty(true)).toBeTruthy();
	expect(isEmpty({})).toBeTruthy();
	expect(isEmpty('abc')).toBeFalsy();
	expect(isEmpty([1, 2])).toBeFalsy();
	Object.prototype.aaa = 'aaa';
	expect(isEmpty({})).toBeTruthy();
	delete Object.prototype.aaa;
});

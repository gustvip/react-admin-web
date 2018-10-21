import isPureObject from '../index';

test('test isPureObject', () => {
	expect(isPureObject({})).toBeTruthy();
	expect(isPureObject(new Map())).toBeFalsy();
});

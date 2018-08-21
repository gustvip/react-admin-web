/**
 * Created by joey on 2018/8/20
 */
import Emitter from '../index';

const mockCallback1 = jest.fn();
const mockCallback2 = jest.fn();
const mockCallback3 = jest.fn();
const emitter = Emitter();
const _emitter = new Emitter();
const array = [
	{isOnce: true, callback: mockCallback1},
	{isOnce: false, callback: mockCallback2},
	{isOnce: false, callback: mockCallback3},
];
test('emitter return', () => {
	expect(emitter).toEqual(_emitter);
	expect(emitter.__selfListeners__).toEqual({});
	expect(emitter.addListener('a', mockCallback1)).toEqual(emitter);
	expect(emitter.addOnceListener('a', mockCallback2)).toEqual(emitter);
	expect(emitter.trigger('c')).toEqual(emitter);
	expect(emitter.removeListener('a', mockCallback1)).toEqual(emitter);
	expect(emitter.removeCategoryListener('a')).toEqual(emitter);
	expect(emitter.removeAllListener()).toEqual(emitter);
});

test('emitter add', () => {
	emitter.addOnceListener('a', mockCallback1);
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(0, 1)});
	
	emitter.addListener('a', mockCallback2);
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(0, 2)});
	
	emitter.addListener('a', mockCallback3);
	expect(emitter.__selfListeners__).toEqual({'a': array});
	
	emitter.addOnceListener('b', mockCallback1);
	expect(emitter.__selfListeners__).toEqual({'a': array, 'b': array.slice(0, 1)});
	
	emitter.addListener('b', mockCallback2);
	expect(emitter.__selfListeners__).toEqual({'a': array, 'b': array.slice(0, 2)});
	
	emitter.addListener('b', mockCallback3);
	expect(emitter.__selfListeners__).toEqual({'a': array, 'b': array});
	
	expect(() => {emitter.addListener('a');}).toThrow();
	expect(() => {emitter.addOnceListener('b', {});}).toThrow();
});

test('emitter trigger', () => {
	expect(mockCallback1.mock.calls.length).toBe(0);
	expect(mockCallback2.mock.calls.length).toBe(0);
	expect(mockCallback3.mock.calls.length).toBe(0);
	
	emitter.trigger('a', 'a0', 'a1');
	expect(mockCallback1.mock.calls.length).toBe(1);
	expect(mockCallback2.mock.calls.length).toBe(1);
	expect(mockCallback3.mock.calls.length).toBe(1);
	expect(mockCallback1.mock.calls[0][0]).toBe('a0');
	expect(mockCallback2.mock.calls[0][0]).toBe('a0');
	expect(mockCallback3.mock.calls[0][0]).toBe('a0');
	expect(mockCallback1.mock.calls[0][1]).toBe('a1');
	expect(mockCallback2.mock.calls[0][1]).toBe('a1');
	expect(mockCallback3.mock.calls[0][1]).toBe('a1');
	expect(mockCallback1.mock.calls[0][2]).toBeUndefined();
	expect(mockCallback2.mock.calls[0][2]).toBeUndefined();
	expect(mockCallback3.mock.calls[0][2]).toBeUndefined();
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(1), 'b': array});
	
	emitter.trigger('a', 'a0', 'a1');
	expect(mockCallback1.mock.calls.length).toBe(1);
	expect(mockCallback2.mock.calls.length).toBe(2);
	expect(mockCallback3.mock.calls.length).toBe(2);
	expect(mockCallback2.mock.calls[1][0]).toBe('a0');
	expect(mockCallback3.mock.calls[1][0]).toBe('a0');
	expect(mockCallback2.mock.calls[1][1]).toBe('a1');
	expect(mockCallback3.mock.calls[1][1]).toBe('a1');
	expect(mockCallback2.mock.calls[1][2]).toBeUndefined();
	expect(mockCallback3.mock.calls[1][2]).toBeUndefined();
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(1), 'b': array});
	emitter.trigger('c', 'a0', 'a1');
	expect(mockCallback1.mock.calls.length).toBe(1);
	expect(mockCallback2.mock.calls.length).toBe(2);
	expect(mockCallback3.mock.calls.length).toBe(2);
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(1), 'b': array});
	
	emitter.trigger('b', 'b0', 'b1');
	expect(mockCallback1.mock.calls.length).toBe(2);
	expect(mockCallback2.mock.calls.length).toBe(3);
	expect(mockCallback3.mock.calls.length).toBe(3);
	expect(mockCallback1.mock.calls[1][0]).toBe('b0');
	expect(mockCallback2.mock.calls[2][0]).toBe('b0');
	expect(mockCallback3.mock.calls[2][0]).toBe('b0');
	expect(mockCallback1.mock.calls[1][1]).toBe('b1');
	expect(mockCallback2.mock.calls[2][1]).toBe('b1');
	expect(mockCallback3.mock.calls[2][1]).toBe('b1');
	expect(mockCallback1.mock.calls[1][2]).toBeUndefined();
	expect(mockCallback2.mock.calls[2][2]).toBeUndefined();
	expect(mockCallback3.mock.calls[2][2]).toBeUndefined();
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(1), 'b': array.slice(1)});
	
	emitter.trigger('b', 'b0', 'b1');
	expect(mockCallback1.mock.calls.length).toBe(2);
	expect(mockCallback2.mock.calls.length).toBe(4);
	expect(mockCallback3.mock.calls.length).toBe(4);
	expect(mockCallback2.mock.calls[3][0]).toBe('b0');
	expect(mockCallback3.mock.calls[3][0]).toBe('b0');
	expect(mockCallback2.mock.calls[3][1]).toBe('b1');
	expect(mockCallback3.mock.calls[3][1]).toBe('b1');
	expect(mockCallback2.mock.calls[3][2]).toBeUndefined();
	expect(mockCallback3.mock.calls[3][2]).toBeUndefined();
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(1), 'b': array.slice(1)});
	
	emitter.trigger('c', 'a0', 'a1');
	expect(mockCallback1.mock.calls.length).toBe(2);
	expect(mockCallback2.mock.calls.length).toBe(4);
	expect(mockCallback3.mock.calls.length).toBe(4);
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(1), 'b': array.slice(1)});
});

test('emitter remove', () => {
	emitter.removeListener('a', 111);
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(1), 'b': array.slice(1)});
	
	emitter.removeListener('a', mockCallback2);
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(2), 'b': array.slice(1)});
	
	emitter.removeCategoryListener('c');
	expect(emitter.__selfListeners__).toEqual({'a': array.slice(2), 'b': array.slice(1)});
	
	emitter.removeCategoryListener('a');
	expect(emitter.__selfListeners__).toEqual({'b': array.slice(1)});
	
	emitter.removeAllListener();
	expect(emitter.__selfListeners__).toEqual({});
});

test('emitter once all and remove all', () => {
	emitter.addOnceListener('a', function () {});
	emitter.trigger('a');
	expect(emitter.__selfListeners__).toEqual({});
	
	emitter.addListener('a', mockCallback1);
	emitter.removeListener('a', mockCallback1);
	emitter.removeListener('b', mockCallback1);
	expect(emitter.__selfListeners__).toEqual({});
});

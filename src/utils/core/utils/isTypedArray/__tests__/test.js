import isTypedArray from '../index';

test('test isTypedArray', () => {
	expect(isTypedArray({})).toBeFalsy();
	expect(isTypedArray(new ArrayBuffer(1))).toBeTruthy();
	expect(isTypedArray(new DataView(new ArrayBuffer(1)))).toBeTruthy();
	expect(isTypedArray(new Float32Array(1))).toBeTruthy();
	expect(isTypedArray(new Float64Array(1))).toBeTruthy();
	expect(isTypedArray(new Int8Array(1))).toBeTruthy();
	expect(isTypedArray(new Int16Array(1))).toBeTruthy();
	expect(isTypedArray(new Int32Array(1))).toBeTruthy();
	expect(isTypedArray(new Int32Array(1))).toBeTruthy();
	expect(isTypedArray(new Uint8ClampedArray(1))).toBeTruthy();
	expect(isTypedArray(new Uint8Array(1))).toBeTruthy();
	expect(isTypedArray(new Uint16Array(1))).toBeTruthy();
	expect(isTypedArray(new Uint32Array(1))).toBeTruthy();
});

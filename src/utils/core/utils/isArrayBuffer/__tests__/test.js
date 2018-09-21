import isArrayBuffer from "../index";

test("test isArrayBuffer", () => {
	expect(isArrayBuffer({})).toBeFalsy();
	expect(isArrayBuffer(new ArrayBuffer(2))).toBeTruthy();
});

import isBuffer from "../index";

test("test isBuffer", () => {
	expect(isBuffer({})).toBeFalsy();
	expect(isBuffer(new Buffer(111))).toBeTruthy();
});

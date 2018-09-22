import isLength from "../index";

test("test isLength", () => {
	expect(isLength(1.1)).toBeFalsy();
	expect(isLength(-2)).toBeFalsy();
	expect(isLength(42949672951)).toBeFalsy();
	expect(isLength(1)).toBeTruthy();
});

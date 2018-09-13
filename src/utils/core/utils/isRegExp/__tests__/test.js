import isRegExp from "../index";

test("test isRegExp", () => {
	expect(isRegExp({})).toBeFalsy();
	expect(isRegExp(new RegExp("111", "i"))).toBeTruthy();
	expect(isRegExp(/a/)).toBeTruthy();
});

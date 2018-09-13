import isUndefined from "../index";

test("test isUndefined", () => {
	expect(isUndefined(undefined)).toBeTruthy();
	expect(isUndefined("")).toBeFalsy();
});

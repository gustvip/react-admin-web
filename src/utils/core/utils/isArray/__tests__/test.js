import isArray from "../index";

test("test isArray", () => {
	expect(isArray({})).toBeFalsy();
	expect(isArray([])).toBeTruthy();
});

import isSet from "../index";

test("test isSet", () => {
	expect(isSet({})).toBeFalsy();
	expect(isSet(new Set())).toBeTruthy();
});

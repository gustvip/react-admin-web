import isFunction from "../index";

test("test isFunction", () => {
	expect(isFunction(() => {})).toBeTruthy();
	expect(isFunction("")).toBeFalsy();
});

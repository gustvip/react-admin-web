import isWeakMap from "../index";

test("test isWeakMap", () => {
	expect(isWeakMap({})).toBeFalsy();
	expect(isWeakMap(new WeakMap())).toBeTruthy();
});

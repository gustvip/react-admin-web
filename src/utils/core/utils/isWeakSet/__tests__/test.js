import isWeakSet from "../index";

test("test isWeakSet", () => {
	expect(isWeakSet({})).toBeFalsy();
	expect(isWeakSet(new WeakSet())).toBeTruthy();
});

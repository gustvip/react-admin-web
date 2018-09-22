import _isFinite from "../index";

test("test _isFinite", () => {
	expect(_isFinite(12)).toBeTruthy();
	expect(_isFinite(Object.create(null))).toBeFalsy();
});

import _parseFloat from "../index";

test("test _parseFloat", () => {
	expect(_parseFloat(12.90)).toBe(12.90);
	expect(_parseFloat(Object.create(null))).toBe(NaN);
});

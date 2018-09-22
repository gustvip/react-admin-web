import _MathExp from "../index";

test("test _MathExp", () => {
	expect(_MathExp(1)).toBeGreaterThan(2);
	expect(_MathExp(Object.create(null))).toBe(NaN);
});

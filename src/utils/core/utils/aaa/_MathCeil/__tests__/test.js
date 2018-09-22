import _MathCeil from "../index";

test("test _MathCeil", () => {
	expect(_MathCeil(6.7)).toBe(7);
	expect(_MathCeil(Object.create(null))).toBe(NaN);
});

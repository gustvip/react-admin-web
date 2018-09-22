import _MathAcos from "../index";

test("test _MathAcos", () => {
	expect(_MathAcos(.5)).toBeGreaterThan(1);
	expect(_MathAcos(Object.create(null))).toBe(NaN);
});

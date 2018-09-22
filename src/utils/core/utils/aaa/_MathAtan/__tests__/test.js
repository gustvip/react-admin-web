import _MathAtan from "../index";

test("test _MathAtan", () => {
	expect(_MathAtan(1)).toBeGreaterThan(.5);
	expect(_MathAtan(Object.create(null))).toBe(NaN);
});

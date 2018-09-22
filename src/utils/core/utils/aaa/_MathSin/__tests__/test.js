import _MathSin from "../index";

test("test _MathSin", () => {
	expect(_MathSin(Math.PI / 6)).toBeGreaterThan(.4);
	expect(_MathSin(Object.create(null))).toBe(NaN);
});

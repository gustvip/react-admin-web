import _MathCos from "../index";

test("test _MathCos", () => {
	expect(_MathCos(Math.PI / 3)).toBeGreaterThan(.4);
	expect(_MathCos(Object.create(null))).toBe(NaN);
});

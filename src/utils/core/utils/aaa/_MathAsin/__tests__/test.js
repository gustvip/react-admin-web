import _MathAsin from "../index";

test("test _MathAsin", () => {
	expect(_MathAsin(.5)).toBeGreaterThan(.5);
	expect(_MathAsin(Object.create(null))).toBe(NaN);
});

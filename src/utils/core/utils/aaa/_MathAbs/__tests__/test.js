import _MathAbs from "../index";

test("test _MathAbs", () => {
	expect(_MathAbs(12)).toBe(12);
	expect(_MathAbs(Object.create(null))).toBe(NaN);
});

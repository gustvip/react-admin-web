import _MathLog from "../index";

test("test _MathLog", () => {
	expect(_MathLog(4)).toBeGreaterThan(1);
	expect(_MathLog(Object.create(null))).toBe(NaN);
});

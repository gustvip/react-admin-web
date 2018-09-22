import _MathTan from "../index";

test("test _MathTan", () => {
	expect(_MathTan(Math.PI / 4)).toBeGreaterThan(.9);
	expect(_MathTan(Object.create(null))).toBe(NaN);
});

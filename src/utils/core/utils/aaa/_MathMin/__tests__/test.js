import _MathMin from "../index";

test("test _MathMin", () => {
	expect(_MathMin(1,2)).toBe(1);
	expect(_MathMin(Object.create(null))).toBe(NaN);
});

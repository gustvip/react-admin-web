import _MathPow from "../index";

test("test _MathPow", () => {
	expect(_MathPow(2,3)).toBe(8);
	expect(_MathPow(Object.create(null))).toBe(NaN);
});

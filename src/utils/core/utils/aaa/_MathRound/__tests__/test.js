import _MathRound from "../index";

test("test _MathRound", () => {
	expect(_MathRound(6.7)).toBe(7);
	expect(_MathRound(Object.create(null))).toBe(NaN);
});

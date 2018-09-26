import _MathMax from "../index";

test("test _MathMax", () => {
	expect(_MathMax(1,2)).toBe(2);
	expect(_MathMax([1,2])).toBe(2);
	expect(_MathMax(Object.create(null))).toBe(NaN);
});

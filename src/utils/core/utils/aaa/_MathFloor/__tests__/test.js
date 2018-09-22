import _MathFloor from "../index";

test("test _MathFloor", () => {
	expect(_MathFloor(12)).toBe(12);
	expect(_MathFloor(Object.create(null))).toBe(NaN);
});

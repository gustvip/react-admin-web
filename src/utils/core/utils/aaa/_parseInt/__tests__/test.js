import _parseInt from "../index";

test("test _parseInt", () => {
	expect(_parseInt(12, 10)).toBe(12);
	expect(_parseInt(Object.create(null))).toBe(NaN);
});

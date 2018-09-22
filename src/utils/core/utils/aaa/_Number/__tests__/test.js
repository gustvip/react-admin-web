import _Number from "../index";

test("test _Number", () => {
	expect(_Number("12")).toBe(12);
	expect(_Number(Symbol(1))).toBe(NaN);
});

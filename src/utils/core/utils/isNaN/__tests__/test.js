import isNaN from "../index";

test("test isNaN", () => {
	expect(isNaN(1.1)).toBeFalsy();
	expect(isNaN(-2)).toBeFalsy();
	expect(isNaN(undefined)).toBeFalsy();
	expect(isNaN(NaN)).toBeTruthy();
	expect(isNaN(Number(NaN))).toBeTruthy();
});

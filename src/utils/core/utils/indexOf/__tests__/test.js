import indexOf from "../index";

test("test indexOf", () => {
	const str1 = "";
	const array1 = [];
	const array2 = ["a", "b", "c"];
	const array3 = ["a", NaN];
	expect(indexOf(str1, 1, 99)).toBe(-1);
	expect(indexOf(array1, 1)).toBe(-1);
	expect(indexOf(array2, "b", -1)).toBe(-1);
	expect(indexOf(array2, "b", -2)).toBe(1);
	expect(indexOf(array2, "b")).toBe(1);
	expect(indexOf(array2, "b", 0)).toBe(1);
	expect(indexOf(array2, "b", 1)).toBe(1);
	expect(indexOf(array2, "b", 2)).toBe(-1);
	expect(indexOf(array2, "b", 3)).toBe(1);
	expect(indexOf(array2, "b", 4)).toBe(1);
	expect(indexOf(array3, NaN, 4)).toBe(1);
});

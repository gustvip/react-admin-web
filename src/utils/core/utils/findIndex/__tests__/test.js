import findIndex from "../index";

test("test findIndex", () => {
	const str1 = "";
	const str2 = "ab";
	const array1 = [];
	const array2 = ["a", "b"];
	expect(findIndex(str1, function() {}, 99)).toBe(-1);
	expect(findIndex(array1, function() {})).toBe(-1);
	expect(findIndex(str1, null, 99)).toBe(-1);
	expect(findIndex(array2, (value) => {
		return value === "b";
	})).toBe(1);
	expect(findIndex(str2, (value) => {
		return value === "b";
	})).toBe(1);
	
	expect(findIndex(array2, (value) => {
		return value === "b";
	}, 1)).toBe(1);
	
	expect(findIndex(array2, (value) => {
		return value === "b";
	}, -1)).toBe(1);
	expect(findIndex(array2, (value) => {
		return value === "b";
	}, 5)).toBe(1);
	expect(findIndex(array2, (value) => {
		return value === "b";
	}, 0)).toBe(1);
	expect(findIndex(array2, (value) => {
		return value === "b";
	}, 2)).toBe(1);
	
	expect(findIndex(array2, (value) => {
		return value === "b";
	}, -5)).toBe(1);
	
});

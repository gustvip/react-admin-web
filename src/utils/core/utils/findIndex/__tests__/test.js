import findIndex from "../index";

test("test findIndex", () => {
	const mockCallback = jest.fn();
	const str1 = "";
	const str2 = "ab";
	const array1 = [];
	const array2 = ["a", "b"];
	
	expect(findIndex(str1, mockCallback, 99)).toBe(-1);
	expect(findIndex(str1, null, 99)).toBe(-1);
	expect(findIndex({}, mockCallback, 99)).toBe(-1);
	expect(findIndex(array1, mockCallback)).toBe(-1);
	expect(findIndex(str2, mockCallback)).toBe(-1);
	expect(findIndex(array2, mockCallback)).toBe(-1);
	expect(findIndex(array2, (value) => {
		return value === "b";
	})).toBe(1);
	expect(findIndex(str2, (value) => {
		return value === "b";
	})).toBe(1);
	expect(findIndex(str2, (value) => {
		return value === "b";
	}, 1)).toBe(1);
});

import findLast from "../index";

test("test findLast", () => {
	const str1 = "";
	const array1 = [];
	const array2 = [{age: 10}, {age: 20}, {age: 30}];
	expect(findLast(str1, function() {}, 99)).toBeUndefined();
	expect(findLast(array1, function() {})).toBeUndefined();
	expect(findLast(str1, null, 99)).toBeUndefined();
	expect(findLast(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, -1)).toEqual({age: 20});
	expect(findLast(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, -2)).toEqual({age: 20});
	expect(findLast(array2, (value) => {
		return value.age > 10 && value.age < 30;
	})).toBeUndefined();
	expect(findLast(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 0)).toBeUndefined();
	expect(findLast(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 1)).toEqual({age: 20});
	expect(findLast(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 2)).toEqual({age: 20});
	expect(findLast(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 3)).toBeUndefined();
	expect(findLast(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 4)).toEqual({age: 20});
});

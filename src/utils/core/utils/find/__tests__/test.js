import find from "../index";

test("test find", () => {
	const str1 = "";
	const array1 = [];
	const array2 = [{age: 10}, {age: 20}, {age: 30}];
	expect(find(str1, function() {}, 99)).toBeUndefined();
	expect(find(array1, function() {})).toBeUndefined();
	expect(find(str1, null, 99)).toBeUndefined();
	expect(find(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, -1)).toBeUndefined();
	expect(find(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, -2)).toEqual({age: 20});
	expect(find(array2, (value) => {
		return value.age > 10 && value.age < 30;
	})).toEqual({age: 20});
	expect(find(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 0)).toEqual({age: 20});
	expect(find(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 1)).toEqual({age: 20});
	expect(find(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 2)).toBeUndefined();
	expect(find(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 3)).toEqual({age: 20});
	expect(find(array2, (value) => {
		return value.age > 10 && value.age < 30;
	}, 4)).toEqual({age: 20});
});

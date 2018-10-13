import concat from "../index";

test("test concat", () => {
	expect(concat(1, 2, 3)).toEqual([1, 2, 3]);
	expect(concat(1, 2, 3, [4])).toEqual([1, 2, 3, 4]);
	expect(concat(1, 2, 3, [4, 5])).toEqual([1, 2, 3, 4, 5]);
	expect(concat(1, 2, 3, [4, [5]])).toEqual([1, 2, 3, 4, [5]]);
});

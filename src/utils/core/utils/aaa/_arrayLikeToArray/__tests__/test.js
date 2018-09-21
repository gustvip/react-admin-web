import _arrayLikeToArray from "../index";

test("test _arrayLikeToArray", () => {
	expect(_arrayLikeToArray("12")).toEqual(["1", "2"]);
	expect(_arrayLikeToArray([1, 2])).toEqual([1, 2]);
	expect(_arrayLikeToArray({
		length: 2,
		"0": 0,
		"1": 1,
	})).toEqual([0, 1]);
});

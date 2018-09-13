import castArray from "../index";

test("test castArray", () => {
	expect(castArray()).toEqual([]);
	expect(castArray(1)).toEqual([1]);
	expect(castArray([1, 2])).toEqual([1, 2]);
});

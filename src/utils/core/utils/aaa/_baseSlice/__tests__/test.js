import _baseSlice from "../index";

test("test _baseSlice", () => {
	const obj = ["a", "b", "c"];
	expect(_baseSlice([])).toEqual([]);
	expect(_baseSlice("")).toEqual([]);
	expect(_baseSlice({})).toEqual([]);
	expect(_baseSlice([], null, null)).toEqual([]);
	expect(_baseSlice(obj)).toEqual(obj);
	expect(_baseSlice(obj, null)).toEqual(obj);
	expect(_baseSlice(obj, 0)).toEqual(obj);
	expect(_baseSlice(obj, 1)).toEqual(["b", "c"]);
	expect(_baseSlice(obj, 2)).toEqual(["c"]);
	expect(_baseSlice(obj, 3)).toEqual([]);
	expect(_baseSlice(obj, 0, 0)).toEqual([]);
	expect(_baseSlice(obj, 0, 1)).toEqual(["a"]);
	expect(_baseSlice(obj, 0, 2)).toEqual(["a", "b"]);
	expect(_baseSlice(obj, 0, 3)).toEqual(obj);
	expect(_baseSlice(obj, -3, -2)).toEqual(["a"]);
	expect(_baseSlice(obj, -2, -3)).toEqual([]);
});

import toArray from "../index";

test("test toArray", () => {
	expect(toArray({})).toEqual([]);
	expect(toArray([1, 2])).toEqual([1, 2]);
	expect(toArray("12")).toEqual(["1", "2"]);
	
	const _map = new Map();
	_map.set("a", 1);
	_map.set("b", 2);
	expect(toArray(_map)).toEqual([1, 2]);
	
	const _set = new Set();
	_set.add(1);
	_set.add(2);
	expect(toArray(_set)).toEqual([1, 2]);
});

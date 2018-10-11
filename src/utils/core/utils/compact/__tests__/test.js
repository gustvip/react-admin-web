import compact from "../index";

test("test compact", () => {
	const obj = ["a", "b", "c", false, null, undefined, 0, ""];
	expect(compact([])).toEqual([]);
	expect(compact("")).toEqual([]);
	expect(compact("")).toEqual([]);
	
	const data = compact(obj);
	expect(data).toEqual(["a", "b", "c"]);
});

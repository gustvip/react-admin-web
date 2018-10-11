import map from "../index";

test("test map", () => {
	const mockCallback = jest.fn();
	const obj = [1, 2, 3];
	expect(map([], mockCallback)).toEqual([]);
	expect(map("", mockCallback)).toEqual([]);
	expect(map("")).toEqual([]);
	const data = map(obj, x => x * 2);
	expect(data).toEqual([2, 4, 6]);
});

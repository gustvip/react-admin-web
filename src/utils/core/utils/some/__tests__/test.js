import some from "../index";

test("test some", () => {
	const mockCallback = jest.fn();
	const obj = [1, 2, 3];
	expect(some([], mockCallback)).toBeFalsy();
	expect(some("", mockCallback)).toBeFalsy();
	expect(some("")).toBeFalsy();
	
	expect(some(obj, x => x > 4)).toBeFalsy();
	expect(some(obj, x => x > 1)).toBeTruthy();
});

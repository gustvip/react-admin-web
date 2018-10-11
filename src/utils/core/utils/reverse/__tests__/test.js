import reverse from "../index";

test("test reverse", () => {
	const obj = [1, 2, 3];
	expect(reverse([])).toEqual([]);
	expect(reverse("")).toEqual([]);
	expect(reverse({})).toEqual([]);
	
	expect(reverse(obj)).toEqual([3, 2, 1]);
});

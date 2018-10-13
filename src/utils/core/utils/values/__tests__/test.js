import values from "../index";

test("test values", () => {
	expect(values({})).toEqual([]);
	expect(values([])).toEqual([]);
	expect(values(null)).toEqual([]);
	expect(values(undefined)).toEqual([]);
	expect(values("123")).toEqual(["1", "2", "3"]);
	expect(values([1, 2, 3])).toEqual([1, 2, 3]);
	
	expect(values({
		a: 1,
		b: 2,
		c: 3,
	})).toContainEqual(1);
	expect(values({
		a: 1,
		b: 2,
		c: 3,
	})).toContainEqual(2);
	expect(values({
		a: 1,
		b: 2,
		c: 3,
	})).toContainEqual(3);
});


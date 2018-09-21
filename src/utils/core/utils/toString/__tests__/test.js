import toString from "../index";

test("test toFinite", () => {
	expect(toString(null)).toBe("");
	expect(toString(undefined)).toBe("");
	expect(toString("abc")).toBe("abc");
	expect(toString([1, 2])).toBe("1,2");
	expect(toString({})).toBe("[object Object]");
	expect(toString({
		toString() {
			return "abc";
		},
	})).toBe("abc");
});

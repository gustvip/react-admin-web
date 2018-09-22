import _String from "../index";

test("test _String", () => {
	expect(_String("12")).toBe("12");
	expect(_String(Object.create(null))).toBe("");
});

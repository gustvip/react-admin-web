import isElement from "../index";

test("test isElement", () => {
	expect(isElement({})).toBeFalsy();
	expect(isElement(document.body)).toBeTruthy();
});

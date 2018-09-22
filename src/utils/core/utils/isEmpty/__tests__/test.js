import isEmpty from "../index";

test("test isEmpty", () => {
	expect(isEmpty({
		key1: "value1",
	})).toBeFalsy();
	expect(isEmpty({})).toBeTruthy();
	expect(isEmpty(null)).toBeTruthy();
	expect(isEmpty(undefined)).toBeTruthy();
	expect(isEmpty(true)).toBeTruthy();
	expect(isEmpty(false)).toBeTruthy();
	
	const map = new Map();
	const set = new Set();
	expect(isEmpty(map)).toBeTruthy();
	expect(isEmpty(set)).toBeTruthy();
	map.set(1, 1);
	set.add(1);
	expect(isEmpty(map)).toBeFalsy();
	expect(isEmpty(set)).toBeFalsy();
	
	expect(isEmpty("abc")).toBeFalsy();
	expect(isEmpty(new ArrayBuffer(1))).toBeFalsy();
	expect(isEmpty([1, 2])).toBeFalsy();
	/* eslint-disable no-extend-native */
	Object.prototype.aaa = "aaa";
	expect(isEmpty({})).toBeTruthy();
	delete Object.prototype.aaa;
});

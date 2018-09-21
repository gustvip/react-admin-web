import isArrayLikeObject from "../index";

test("test isArrayLikeObject", () => {
	expect(isArrayLikeObject(1)).toBeFalsy();
	expect(isArrayLikeObject(() => {
	
	})).toBeFalsy();
	expect(isArrayLikeObject({length: 2})).toBeTruthy();
	expect(isArrayLikeObject(arguments)).toBeTruthy();
});

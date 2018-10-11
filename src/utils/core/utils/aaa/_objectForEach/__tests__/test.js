import _objectForEach from "../index";

test("test _objectForEach", () => {
	const mockCallback = jest.fn();
	/* eslint-disable no-extend-native */
	Object.prototype.aaaaaaaaaaaaaaaaaaaaaaaa = "aaa";
	const obj = { key1: "value1", key2: "value2", key3: "value3" };
	expect(_objectForEach({}, mockCallback)).toBeUndefined();
	delete Object.prototype.aaaaaaaaaaaaaaaaaaaaaaaa;
	mockCallback.mockReturnValueOnce(true).mockReturnValueOnce(false);
	_objectForEach(obj, mockCallback);
	expect(mockCallback.mock.calls.length).toBe(2);
	expect(mockCallback.mock.calls[0][0]).toBe("value1");
	expect(mockCallback.mock.calls[0][1]).toBe("key1");
	expect(mockCallback.mock.calls[0][2]).toEqual(obj);
	expect(mockCallback.mock.calls[0][3]).toBeUndefined();
	expect(mockCallback.mock.calls[1][0]).toBe("value2");
	expect(mockCallback.mock.calls[1][1]).toBe("key2");
	expect(mockCallback.mock.calls[1][2]).toEqual(obj);
	expect(mockCallback.mock.calls[1][3]).toBeUndefined();
});

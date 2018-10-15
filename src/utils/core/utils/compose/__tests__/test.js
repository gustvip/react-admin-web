import compose from "../index";

describe("compose", () => {
	it("init param", () => {
		expect(() => compose(1, 2)).toThrow();
	});
	
	it("length 0", () => {
		expect(compose()(1)).toBe(1);
	});
	
	it("length 1", () => {
		expect(compose(Number)(undefined)).toBe(NaN);
		expect(compose(String)(222)).toBe("222");
		expect(compose(Boolean)(1)).toBe(true);
		expect(compose(parseInt)(111.222)).toBe(111);
	});
	
	it("length >=2", () => {
		function addName(name) {
			return "hello " + name;
		}
		
		function addWorld(name) {
			return name + " this is xxx";
		}
		
		function identity(x) {
			return x;
		}
		
		expect(compose(addWorld, addName, identity)("compose")).toBe("hello compose this is xxx");
		expect(compose([addWorld, addName, identity])("compose")).toBe("hello compose this is xxx");
	});
});

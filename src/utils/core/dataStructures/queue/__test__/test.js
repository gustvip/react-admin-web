import Index from "../index";

describe("Index", () => {
	it("should create empty queue", () => {
		const queue = new Index();
		expect(queue).not.toBeUndefined();
		expect(queue.linkedList).not.toBeNull();
		queue.enqueue(1);
		expect(queue.has(2)).toBeFalsy();
		expect(queue.has(1)).toBeTruthy();
		expect(queue.clear()).toEqual(queue);
		expect(queue.has(1)).toBeFalsy();
	});
	
	it("should enqueue data to queue", () => {
		const queue = new Index();
		
		queue.enqueue(1);
		queue.enqueue(2);
		
		expect(queue.toString()).toBe("1,2");
	});
	
	it("should be possible to enqueue/dequeue objects", () => {
		const queue = new Index();
		
		queue.enqueue({
			value: "test1",
			key: "key1",
		});
		queue.enqueue({
			value: "test2",
			key: "key2",
		});
		
		const stringifier = value => `${value.key}:${value.value}`;
		
		expect(queue.toString(stringifier)).toBe("key1:test1,key2:test2");
		expect(queue.dequeue().value).toBe("test1");
		expect(queue.dequeue().value).toBe("test2");
	});
	
	it("should peek data from queue", () => {
		const queue = new Index();
		
		expect(queue.peek()).toBeUndefined();
		
		queue.enqueue(1);
		queue.enqueue(2);
		
		expect(queue.peek()).toBe(1);
		expect(queue.peek()).toBe(1);
	});
	
	it("should check if queue is empty", () => {
		const queue = new Index();
		
		expect(queue.isEmpty()).toBe(true);
		
		queue.enqueue(1);
		
		expect(queue.isEmpty()).toBe(false);
	});
	
	it("should dequeue from queue in FIFO order", () => {
		const queue = new Index();
		
		queue.enqueue(1);
		queue.enqueue(2);
		
		expect(queue.dequeue()).toBe(1);
		expect(queue.dequeue()).toBe(2);
		expect(queue.dequeue()).toBeNull();
		expect(queue.isEmpty()).toBe(true);
	});
	
	it("had undefined", () => {
		const queue = new Index();
		
		queue.enqueue(1);
		queue.enqueue(undefined);
		expect(queue.size).toBe(2);
		expect(queue.has(undefined)).toBe(true);
	});
});

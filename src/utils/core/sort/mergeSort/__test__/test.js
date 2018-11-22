import mergeSort from '../index';

describe('mergeSort', () => {
	it('sort number', () => {
		expect(mergeSort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2])).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4, 4]);
	});
	
	it('sort string', () => {
		expect(mergeSort([3, 4, 2, 1, 0, 0, 4, 3, 4, 2].map(value => '' + value))).toEqual([0, 0, 1, 2, 2, 3, 3, 4, 4, 4].map(value => '' + value));
	});
	
	it('sort object', () => {
		const arr = [
			{age: 1},
			{age: 30},
			{age: 20},
			{age: 5},
			{age: 7},
			{age: 25},
		];
		
		function compareCallback(a, b) {
			if (a.age === b.age) {
				return 0;
			}
			return a.age < b.age ? -1 : 1;
		}
		
		expect(mergeSort(arr, compareCallback)).toEqual(
			[
				{age: 1},
				{age: 5},
				{age: 7},
				{age: 20},
				{age: 25},
				{age: 30},
			],
		);
	});
	
});
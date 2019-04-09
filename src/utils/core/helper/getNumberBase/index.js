import {toFinite} from 'lodash';

/**
 * @param {*} x
 * @param {number} radix
 * @return {{index: *, base: string}}
 */
function getNumberBase(x, radix = 1024) {
	const baseCollection = ['B', 'K', 'M', 'G', 'T'];
	x = toFinite(Math.abs(x));
	if (x < radix) {
		return {
			index: 0,
			base: baseCollection[0],
		};
	}
	let index = Math.floor(Math.log(x) / Math.log(radix));
	index = index >= baseCollection.length ? baseCollection.length - 1 : index;
	return {
		index,
		base: baseCollection[index],
	};
}

export default getNumberBase;

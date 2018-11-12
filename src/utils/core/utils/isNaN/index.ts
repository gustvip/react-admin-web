/**
 * Created by joey on 2018/6/20
 */

/**
 * 是否number && NaN
 * @param {*} x
 * @returns {boolean}
 */
export default function isNaN(x?: any): boolean {
	return x !== x;
}

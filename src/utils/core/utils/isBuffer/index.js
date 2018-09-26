/**
 * Created by joey on 2018/8/25
 */

/**
 * 是否为Buffer
 * @param {*} x
 * @returns {boolean}
 */
export default function isBuffer(x) {
	try {
		return Buffer.isBuffer(x);
	} catch (e) {
		return false;
	}
}

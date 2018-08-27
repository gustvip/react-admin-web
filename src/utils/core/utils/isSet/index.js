/**
 * Created by joey on 2018/6/20
 */

/**
 * 是否为Map
 * @param {*} x
 * @returns {boolean}
 */
export default function isSet (x) {
	return Object.prototype.toString.call(x) === '[object Set]';
};

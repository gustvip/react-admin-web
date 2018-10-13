/**
 * Created by joey on 2018/6/20
 */
import indexOf from "../indexOf";

/**
 * 是否包含此值
 * @param {*} x
 * @param {*} value
 * @param {number} [fromIndex]
 * @returns {boolean}
 */
export default function includes(x, value, fromIndex) {
	return indexOf(x, value, fromIndex) !== -1;
}

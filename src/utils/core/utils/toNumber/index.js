/**
 * Created by joey on 2018/8/28
 */

/**
 * 转化为number
 * 防止基础类型无法转化问题---Object.create(null)
 * @param {*} x
 * @returns {number}
 */
export default function toNumber(x) {
	try {
		return Number(x);
	} catch (e) {
		return NaN;
	}
}

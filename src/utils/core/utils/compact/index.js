/**
 * Created by joey on 2018/6/20
 */
import filter from "../filter";
import identity from "../identity";

/**
 * 筛选集合
 * @param {array | string} [data]
 * @returns {array}
 */
export default function compact(data) {
	return filter(data, identity);
}

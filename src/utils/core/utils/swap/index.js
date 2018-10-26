/**
 * Created by joey on 2018/10/25
 */

/**
 * 交换数组元素的位置
 * @param {Array} data
 * @param {number} firstIndex
 * @param {number} secondIndex
 */
export default function swap(data, firstIndex, secondIndex) {
	var t = data[firstIndex];
	data[firstIndex] = data[secondIndex];
	data[secondIndex] = t;
	return data;
}

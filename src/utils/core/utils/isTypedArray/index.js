/**
 * Created by joey on 2018/8/25
 */
import _getClassName from "../aaa/_getClassName/index";
import findIndex from "../findIndex";

/**
 * 是否为类型数组
 * @param {*} x
 * @returns {boolean}
 */
export default function isTypedArray(x) {
	let className = _getClassName(x);
	let typedArray = [
		"[object ArrayBuffer]",
		"[object DataView]",
		"[object Float32Array]",
		"[object Float64Array]",
		"[object Int8Array]",
		"[object Int16Array]",
		"[object Int32Array]",
		"[object Uint8Array]",
		"[object Uint8ClampedArray]",
		"[object Uint16Array]",
		"[object Uint32Array]",
	];
	let index = findIndex(typedArray, function(value) {
		return className === value;
	});
	return index !== -1;
}

/**
 * Created by joey on 2018/8/25
 */
import _getClassName from '../aaa/_getClassName/index';
import indexOf from '../indexOf/index';

export default function isTypedArray(x: any): boolean {
	var className = _getClassName(x);
	var typedArray = ['[object ArrayBuffer]', '[object DataView]', '[object Float32Array]', '[object Float64Array]', '[object Int8Array]', '[object Int16Array]', '[object Int32Array]', '[object Uint8Array]', '[object Uint8ClampedArray]', '[object Uint16Array]', '[object Uint32Array]'];
	return indexOf(typedArray, className) !== -1;
}

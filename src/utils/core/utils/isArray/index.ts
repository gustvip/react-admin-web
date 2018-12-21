/**
 * Created by joey on 2018/6/20
 */
import _getClassName from '../_getClassName/index';

export default function isArray(x?: any): boolean {
	return _getClassName(x) === '[object Array]';
}

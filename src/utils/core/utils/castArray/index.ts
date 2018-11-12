/**
 * Created by joey on 2018/10/15
 */
import isArray from '../isArray/index';

export default function castArray(value?: any): any[] {
	if (!arguments.length) {
		return [];
	}
	return isArray(value) ? value : [value];
}

/**
 * Created by joey on 2018/6/20
 */
import indexOf from '../indexOf/index';

export default function includes(x: any, value: any, fromIndex?: any): boolean {
	return indexOf(x, value, fromIndex) !== -1;
}

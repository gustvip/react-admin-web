/**
 * Created by joey on 2018/6/20
 */
import filter from '../filter/index';
import identity from '../identity/index';

export default function compact(data?: any): any[] {
	return filter(data, identity);
}

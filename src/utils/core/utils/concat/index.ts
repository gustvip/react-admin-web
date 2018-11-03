/**
 * Created by joey on 2018/6/20
 */
import _baseSlice from '../aaa/_baseSlice/index';
import flatten from '../flatten/index';

export default function concat(): any[] {
	return flatten(_baseSlice(arguments));
}

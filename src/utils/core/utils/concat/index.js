/**
 * Created by joey on 2018/6/20
 */
import _baseSlice from '../aaa/_baseSlice';
import flatten from '../flatten';

/**
 * 连接集合
 * @returns {array}
 */
export default function concat() {
	return flatten(_baseSlice(arguments));
}

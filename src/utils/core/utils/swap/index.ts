/**
 * Created by joey on 2018/10/25
 */

export default function swap(data: any[], firstIndex: number, secondIndex: number): any[] {
	var t = data[firstIndex];
	data[firstIndex] = data[secondIndex];
	data[secondIndex] = t;
	return data;
}

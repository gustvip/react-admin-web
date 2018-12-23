/**
 * Created by joey on 2018/10/25
 */

export default function swap(data: any[], first: number, second: number): any[] {
	var t = data[first];
	data[first] = data[second];
	data[second] = t;
	return data;
}

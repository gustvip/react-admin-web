import {forOwn} from 'lodash';

/**
 * 将[{},{}...]转化为tree的数据结构
 * @param {Array} data
 * @param {string} parentIdName 指向parent的key
 * @param {string} ownIdName 指向own的key
 * @param {string} [childrenName] 生成children的key
 * @param {number} [treeDepth] 树的深度
 * @return {Array}
 */
function formatTreeData(data, parentIdName, ownIdName, childrenName = 'children', treeDepth = 20000) {
	// 格式化children的值
	data = data.map(value => {
		value[childrenName] = Array.isArray(value[childrenName]) ? value[childrenName] : [];
		return value;
	});
	
	// 分组
	const result = [];
	const groupData = data.reduce((prev, value) => {
		if (!value[parentIdName]) {
			result.push(value);
		} else if (prev[value[parentIdName]]) {
			prev[value[parentIdName]].push(value);
		} else {
			prev[value[parentIdName]] = [value];
		}
		return prev;
	}, {});
	
	// 递归格式化树
	!(function format(childData, index) {
		if (index <= treeDepth) {
			childData.forEach(value => {
				forOwn(groupData, (val, key) => {
					if (value[ownIdName] == key) {
						value[childrenName] = value[childrenName].concat(val);
					}
				});
				value[childrenName].length && format(value[childrenName], index + 1);
			});
		}
	}(result, 2));
	
	return result;
}

export default formatTreeData;

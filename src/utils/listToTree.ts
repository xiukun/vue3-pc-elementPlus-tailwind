/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 18:19:27
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-08 14:28:46
 */

/**
 * list结构转tree
 * @param data list原始数据
 * @param pid 最外层pid
 */
export function listToTree(
	data: Array<any>,
	pid: string | number = 1,
	isChildNull = false
): Array<any> {
	const d: Array<unknown> = [];
	data.forEach((val) => {
		if (val.parentId == pid) {
			const list = listToTree(data, val.id, isChildNull);
			const obj: any = { ...val };
			if (!isChildNull || list.length !== 0) {
				obj.children = list;
			}
			d.push(obj);
		}
	});
	return d;
}

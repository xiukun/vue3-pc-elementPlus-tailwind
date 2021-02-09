/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 17:41:06
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-07 17:45:44
 */
import { http } from '@/core/ajax';
import { AxiosPromise } from 'axios';
const api = {
	getTableList: '/getTableList',
};
export type ITag = '所有' | '家' | '公司' | '学校' | '超市';
export interface ITableList {
	page: number;
	size: number;
	tag: ITag;
}
export function getTableList(tableList: ITableList): AxiosPromise {
	return http({
		url: api.getTableList,
		method: 'get',
		data: tableList,
	});
}

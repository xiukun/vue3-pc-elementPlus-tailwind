/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 17:23:16
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-07 17:23:19
 */

/**
 * 金额格式化
 * @param num 金额
 * @param symbol 金额前面修饰符号，如$,￥
 */
export function format(num: number | string, symbol = '￥'): string {
	if (Number.isNaN(Number(num))) return `${symbol}0.00`;
	return (
		symbol +
		Number(num)
			.toFixed(2)
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	);
}
/**
 * 取消金额格式化
 * @param str 金额
 */
export function unformat(str: string): number | string {
	const s = str.substr(1).replace(/\,/g, '');
	return Number.isNaN(Number(s)) || Number(s) === 0 ? '' : Number(s);
}

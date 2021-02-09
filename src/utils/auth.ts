/*
 * @Description: token封装
 * @Autor: xiukun@herry
 * @Date: 2021-02-08 18:05:28
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-08 18:09:38
 */
import db from './db';
const TokenKey = 'admin-token';

export function getToken() {
	return db.get(TokenKey);
}

export function setToken(token: any) {
	return db.set(TokenKey, token, 1000 * 60 * 60);
}

export function removeToken() {
	return db.remove(TokenKey);
}

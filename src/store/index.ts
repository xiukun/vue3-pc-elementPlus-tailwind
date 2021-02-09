/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 18:12:33
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-07 18:12:58
 */
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import layout from './module/layout';
import { IState } from '@/global';

export const store = createStore<IState>({
	modules: {
		layout,
	},
});

export function useStore(): Store<IState> {
	return baseUseStore();
}

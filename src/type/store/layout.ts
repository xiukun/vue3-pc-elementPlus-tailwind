/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 17:11:17
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-09 13:01:17
 */

export enum IMenubarStatus {
	PCE, // 电脑展开
	PCN, // 电脑合并
	PHE, // 手机展开
	PHN, // 手机合并
}
export interface ISetting {
	theme: number;
	showTags: boolean;
}

export interface ILayout {
	// 左侧导航栏
	menubar: {
		status: IMenubarStatus;
		menuList: Array<any>;
		isPhone: boolean;
	};
	// 用户信息
	userInfo: {
		name: string;
		role: Array<string>;
	};
	// 标签栏
	tags: {
		tagsList: Array<ITagsList>;
		cachedViews: Array<string>;
	};
	token: string;
	showSettings: boolean;
	setting: ISetting;
	isLoading: boolean;
}
interface IMenubar {
	parentId?: number | string;
	id?: number | string;
	name: string;
	path: string;
	redirect?: string | { name: string };
	meta: {
		icon?: string;
		title: string;
		permission?: Array<string>;
		activeMenu?: string;
		noCache?: boolean;
		hidden?: boolean;
	};
}

// export interface IMenubarList extends IMenubar {
// 	component: any;
// 	children?: Array<IMenubarList>;
// }
// export interface IMenubarRoute extends IMenubar {
// 	component: string;
// 	children?: Array<IMenubarRoute>;
// }

export interface ITagsList {
	name: string;
	title: string;
	path: string;
	isActive: boolean;
}

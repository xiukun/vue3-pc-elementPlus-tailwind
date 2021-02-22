/*
 * @Description:
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 17:11:17
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-20 19:30:16
 */

export enum IMenubarStatus {
    PCE, // 电脑展开
    PCN, // 电脑合并
    PHE, // 手机展开
    PHN // 手机合并
}
export interface ISetting {
    theme: number
    showTags: boolean
}

export interface ILayout {
    // 左侧导航栏
    menubar: {
        status: IMenubarStatus
        menuList: Array<any>
        isPhone: boolean
    }
    // 用户信息
    userInfo: {
        name: string
        role: Array<string>
    }
    // 标签栏
    tags: {
        tagsList: Array<ITagsList>
        cachedViews: Array<string>
    }
    token: string
    showSettings: boolean
    setting: ISetting
    isLoading: boolean
}
export interface ITagsList {
    name: string
    title: string
    path: string
    isActive: boolean
}

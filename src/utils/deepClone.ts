/*
 * @Description: 对象数组深拷贝
 * @Autor: xiukun@herry
 * @Date: 2021-03-11 10:10:48
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-03-11 10:15:06
 */
/**
 * 对象数组深拷贝
 * @param {Array,Object} source 需要深拷贝的对象数组
 * @param {Array} noClone 不需要深拷贝的属性集合
 */
const deepClone = (source: any, noClone: string[] = []): any => {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments deepClone')
    }
    const targetObj: any = source.constructor === Array ? [] : {}
    Object.keys(source).forEach((keys: string) => {
        if (source[keys] && typeof source[keys] === 'object' && noClone.indexOf(keys) === -1) {
            targetObj[keys] = deepClone(source[keys], noClone)
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}
export default deepClone

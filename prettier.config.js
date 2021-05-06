/*
 * @Description: 
 * @Autor: xiukun@herry
 * @Date: 2021-05-06 18:19:17
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-05-06 19:36:29
 */
module.exports = {
    printWidth: 150, // 超过最大值换行
    tabWidth: 4, // 缩进字节数
    useTabs: false, // 缩进不使用tab，使用空格
    semi: true, // 未尾逗号
    vueIndentAndStyle: true,
    singleQuote: true, // 单引号
    quoteProps: 'as-needed',
    bracketSpacing: true,
    // trailingComma: 'none', // 未尾分号
    jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
    jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
    arrowParens: 'always', //  (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    insertPragma: false,
    requirePragma: false, // 不需要写文件开头的 @prettier
    htmlWhitespaceSensitivity: 'strict',
    endOfLine: 'lf'
}

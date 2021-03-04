# vue3demo

## 分支
* 增加了*i18n多语言版本分支（基本逻辑写完了，待优化）
## 生命周期
> Options API形式的组件生命周期钩子和Composition API之间的实际对应关系
 * beforeCreate -> setup()
 * created -> setup()
 * beforeMount -> onBeforeMount
 * mounted -> onMounted
 * beforeUpdate -> onBeforeUpdate
 * updated -> onUpdated
 * beforeDestroy -> onBeforeUnmount
 * destroyed -> onUnmounted
 * errorCaptured -> onErrorCaptured

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

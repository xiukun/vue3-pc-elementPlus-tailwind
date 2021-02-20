/*
 * @Description: localStorage 存储
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 16:24:21
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-20 14:11:12
 */
const db = (function() {
	// 本地存储前缀，减少命名冲突
	let prefix: string = process.env.VUE_APP_LOCAL_NAME || 'pc';
	return {
		setPrefix: function(_prefix: string): void {
			prefix = _prefix;
			// 本地存储前缀只允许修改一次，如果多次修改，由于单例，可能会导致只能写入，不能读取
			this.setPrefix = () => {};
		},
		getPrefix: function() {
			return prefix;
		},
		/**
		 * 缓存数据
		 * @param key 名称
		 * @param value 值
		 * @param expriess
		 */
		set: function(key: string, value: unknown, expriess: number = 0) {
			let o = {
				value,
				createTime: Date.now(),
				expriess,
			};
			localStorage.setItem(prefix + '-' + key, JSON.stringify(o));
		},
		/**
		 * 查询缓存数据
		 * @param key 名称
		 */
		get: function(key: string) {
			let val = localStorage.getItem(prefix + '-' + key);
			let storage: any = null;
			if (val) storage = JSON.parse(val);

			if (!!storage === false) {
				return null;
			} else {
				if (storage.expriess <= 0) {
					return storage.value;
				} else {
					if (storage.expriess + storage.createTime > Date.now()) {
						return storage.value;
					}
					// 过期销毁
					this.remove(key);
					return null;
				}
			}
		},
		/**
		 * 删除缓存
		 * @param key 名称
		 */
		remove(key: string) {
			localStorage.removeItem(prefix + '-' + key);
		},
		/**
		 * 删除所有缓存
		 */
		clear() {
			for (var key in localStorage) {
				if (key.includes(prefix)) {
					this.remove(key.split('-')[1]);
				}
			}
		},
	};
})();

export default db;

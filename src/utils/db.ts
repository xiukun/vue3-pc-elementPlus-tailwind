/*
 * @Description: localStorage 存储
 * @Autor: xiukun@herry
 * @Date: 2021-02-07 16:24:21
 * @LastEditors: xiukun@herry
 * @LastEditTime: 2021-02-08 09:58:23
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
		set: function(key: string, value: unknown, expriess: number = 0) {
			let o = {
				value,
				createTime: Date.now(),
				expriess,
			};
			localStorage.setItem(prefix + '-' + key, JSON.stringify(o));
		},
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
		remove(key: string) {
			localStorage.removeItem(prefix + '-' + key);
		},
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

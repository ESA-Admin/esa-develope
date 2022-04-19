# esa-develope

## 快速上手

1. `main.js`引入ESA开发库
```js
// main.js
import esa from '@/uni_modules/esa-develope'
Vue.use(esa)
```

2. `App.vue`引入基础样式(注意style标签需声明scss属性支持)
```css
/* App.vue */
<style lang="scss">
@import "@/uni_modules/esa-develope/index.scss";
</style>
```

3. `pages.json`配置easycom规则(按需引入)

```js
// pages.json
{
	"easycom": {
		"^esa-(.*)": "@/uni_modules/esa-develope/components/esa-$1/esa-$1.vue"
	},
	// 此为本身已有的内容
	"pages": [
		// ......
	]
}
```

4. `/static/`目录下添加config.json文件
```json
{
	"debug"	: true,
	"url"	: "https://dev.esaadmin.com",
	"pfid"	: 1,
	"addon"	: "we_demo"
}
```
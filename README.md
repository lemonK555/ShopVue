# shopvue

> 移动电商

## 1、利用vue-cli构建了项目
	vue init webpack
## 2、安装babel-plugin-import，按需引入组件
	2.1安装插件
	npm install babel-plugin-import --save-dev
	npm install vant
	2.2配置
	2.2.1在.babelrc中配置plugins
	"plugins": [
	    "transform-vue-jsx", 
	    "transform-runtime",
	    ["import",{"libraryName":"vant","style":true}]
	]
	2.2.2在main.js中引用vant
	import { Button } from 'vant'
	Vue.use(Button)
	2.2.3在组件页面中加入vant组件
	<van-button type="primary">主要按钮</van-button>
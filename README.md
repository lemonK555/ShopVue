# shopVue

> 移动电商

# 一、第一步的相关配置
## 1、利用vue-cli构建了项目
```
vue init webpack
```
## 2、安装babel-plugin-import，按需引入组件
**2.1安装插件**
```
npm install babel-plugin-import --save-dev
npm install vant
```
**2.2配置**
* 2.2.1在.babelrc中配置plugins*
```
"plugins": [
    "transform-vue-jsx", 
    "transform-runtime",
    ["import",{"libraryName":"vant","style":true}]
]
```
* 2.2.2在main.js中引用vant*
```	
import { Button } from 'vant'
Vue.use(Button)
```
* 2.2.3在组件页面中加入vant组件*
	
	<van-button type="primary">主要按钮</van-button>
## 3、main.js配置了全局vant下的Row  Col Button Search Swipe SwipeItem
```	
import { Button,Row,Col } from 'vant'
Vue.use(Button).use(Row).use(Col)user(Search).user(Swipe).user(SwiperItem);
```	
**3.1 ShoppingMall中使用vant标签**

# 二、首面的搭建---ShoppingMall
## 搜索栏

## 轮播图

**通过data中的bannerPicArray变量获取图片地址**

## 使用Mock数据进行flex布局

>从上到下依次布局：搜索栏、轮播图、广告、商品推荐（分页器）、楼层、热卖商品
**1、安装axiso插件,并在所需页面组件中引入**
```
npm install --save axios
import axios from 'axios'
```
**2、在create的生命周期中取得数据，该变量需要在data中定义**
```
created(){
    axios({
        url: 'https://www.easy-mock.com/mock/5ae2427800247c2aa1efe442/SmileVue/',
        method: 'get',
    })
    .then(response => {
        console.log(response)
        this.category = response.data.data.category;
    })
    .catch((error) => {     
    })
}
```
**3、安装vue-awesome-swiper插件，用于分页**
```
npm install veu-awesome-swiper --save	
```
* 全局引入*
```
import Vue from 'vue'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)	
```
* 组件形式引入，优点依赖性不强，本次*
```
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
	components: {
	swiper,
	swiperSlide
	}
}
```
**4、components下新建swiper文件夹，存放轮播组件**
* 添加分页器-->即轮播中的小圆点*
```javascript
swiperOption:{
    pagination:{
        el:'.swiper-pagination'
    }
}
```
* 并在template中添加div用于显示，必须在swiper-slide外层 *
```
<div class="swiper-pagination" slot="pagination"></div>
```
* 在swiper中加入  :options="swiperOption"*

>点击小圆点自动跳转-->clickable:true

>swiperDefault为横屏无限滚动-->loop:true

>swiperDefault2为竖屏滚动-->direction:'vertical'

>swiperText为区域滚动

**5、通过引入子组件，构造首页-楼层**
* 5.1 在components新建文件夹component，存放子组件floorComponent *
* 5.2 引用子组件，然后在components注册组件，并通过绑定变量，传递到子组件 *
```
import floorComponent from '../component/floorComponent'

components:{
	floorComponent
},

<floorComponent :floorData="floor1" :floorTitle="floorName.floor1" :floorNum="1"></floorComponent>
```
* 5.3 在子组件中庸props接收变量,使用watch监听floorData,当数据变化时，重新构造页面 *
```
props:['floorData','floorTitle','floorNum'],
watch:{
	floorData:function(val){
		console.log(this.floorData)
		this.floorData0 = this.floorData[0];
		this.floorData1 = this.floorData[1];
		this.floorData2 = this.floorData[2];
	}
},
```
**6、过滤器的编写-处理js在小数部分的瑕疵**
* 编写过滤器内容，首页中引用，并在属性filter中编写属性*
```
@表示src目录，可在/build/webpack.base.conf.js中配置
import {toMoney} from '@/filter/moneyFilter.js'

filters:{
	moneyFilter(money){
		return toMoney(money)
	}
},
```
**7、使用vant的List组件完成商品热 卖的布局**
* 7.1 在src/App中按需引入List组件*
* 7.2 在首页.vue中的data声明变量，并在axios中获得变量的数据*
* 7.3 加入van-list组件并使用van-row进行布局*
```
<van-list>
    <van-row gutter="20">
	    <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
	        <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
	    </van-col>
	</van-row>
</van-list>
```
>1：gutter设置了左右的padding,值为gutter值的一半；
>2：span一共24，span="12"表示占据一半
**8、为了维护的方便，在src下建立serviceAPI.config.js配置数据接口文件**

# 二、第二步的相关配置
## 安装koa和MongoDB
**1、运行MongoDB**
```
mongod	--启动服务器-新建需要在安装盘的根目录建立data/db
mongo	--连接服务器
```
**2、连接数据库-Mongoose一个开源封装好的实现Node和MongoDB数据通讯的数据建模库**
* 2.1 安装Mongoose*
```
npm install mongoose --save
```
* 2.2连接数据库*
	
	在service下新建文件夹database--用来存放和数据库操作相关的文件
	在database下建立init.js文件--用来作数据库的连接和初始化
	然后在service/index.js加入立即执行函数
	最后在终端进入service使用node index.js
```
	//引入connect
	const {connect} = require('./database/init.js')

	//立即执行函数
	;(async () =>{
	    await connect()
	})()
```
* 2.3Mongoose的Schema建模*
>Schema以key-value形式的Json数据
	
	在service/database下新建schema,再新建User.js文件
* 2.4载入Schema和插入查出数据*
	
	1、安装glob
	npm install glob --save
	
	2、再service/init.js中引入glob和resolve
	const glob = require('glob')
	const {resolve} = require('path')
	
	3、一次性引入所有的Schema文件
	exports.initSchemas = () =>{
	    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
	}
	
	4、操作数据库-插入
	
	在database/index.js中引入
	const mongoose = require('mongoose')
	const {connect , initSchemas} = require('./database/init.js')
	
	再插入数据
	;(async () =>{
	    await connect()
	    initSchemas()
	    const User = mongoose.model('User')
	    let oneUser = new User({userName:'jspang',password:'123456'})
	    oneUser.save().then(()=>{
	        console.log('插入成功')
	    })
	})()
	
	5、数据库的加密
	安装bcrypt,在database/schema/User.js下引用
	npm install --save bcrypt

# 三、第三步的相关配置
## 注册页面的编写
* 1、在路由中注册*
* 2、在main.js中引入Field和NavBar插件*

# 四、前后端的通讯
## 1. 使用Koa2将路由模块化---将service/index.js中的路由拆分开来
* (1)在service下安装koa-router*
```
	npm install koa-router --save
```
* (2)在service下新建appApi/User.js 编写子路由内容*
* (3)在index.js中进行相关配置，使其访问到子路由*

## 2.打通前后端的通讯
* (1)安装koa-bodyparser---用于接收前端发送的请求*
```
	npm install --save koa-bodyparser
```
* (2)安装好后在service/index.js中注册和使用中间件*
```
	const bodyParser = require('koa-bodyparser')
	app.use(bodyParser())
```
* (3)前端引入axios用于发送请求*
* (4)修改serviceAPI.config.js的配置文件，加入接口地址*
* (5)在register.vue页面引用接口配置文件↑*
* (6)安装koa2-cors中间件，并引用注册，同上。其作用是自动配置请求头文件*
* (7)在service/appApi/user.js中编写接收前台数据的方法*

	前台数据可用---ctx.request.body获取到
* (8)对数据库的操作*
>在service/appApi/user.js中引入mongoose，用于操作Schema

>在service下新建fsJson.js用于文件读取以及提纯

	 注：
	 	1、vant中的PullRefresh实现下拉刷新。
	 	2、params传参，路径只能使用name;query传参时路径使用path。
		 	this.$router.push({name:'Goods',params:{goodsId:id}})
		 	this.$router.push({path:'goods',query:{goodsId:this.goodsId}})
	 	取参：
	 		this.$route.params.goodsId
	 		this.$route.query.goodsId
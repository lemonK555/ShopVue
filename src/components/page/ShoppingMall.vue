<template>
	<div>
		<!-- 搜索栏 -->
		<div class="search-bar">
			<van-row>
				<van-col span="3">
					<img :src="locationIcon" width="60%" class="location-icon">
				</van-col>
				<van-col span="16">
					<input type="text" class="search-input">
				</van-col>
				<van-col span="5">
					<van-button size="mini">查找</van-button>
				</van-col>
			</van-row>
		</div>
	<!-- 轮播图 -->
		<div class="swiper-area">
			<van-swipe :autoplay="2000">
				<van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
					<img :src="banner.imageUrl" width="100%">
				</van-swipe-item>
			</van-swipe>
		</div>
	<!-- 菜单栏 -->
		<div class="type-bar">
			<div v-for="(cate,index) in category" :key="index">
				<img v-lazy="cate.image" width="90%">
				<span>{{cate.mallCategoryName}}</span>
			</div>
		</div>
	<!-- 广告 -->
		<div class="ad-banenr">
			<img v-lazy="adBanner.PICTURE_ADDRESS" width="100%">
		</div>
	<!-- 商品推荐 -->
		<div class="recommend-area">
			<div class="recommend-title">
				<span class="triangle"></span>商品推荐
			</div>
			<div class="recommend-body">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item,index) in recommendGoods" :key="index">
						<div class="recommend-item">
							<img :src="item.image" width="80%">
							<div>{{item.goodsName}}</div>
							<div>￥{{item.price|moneyFilter}}(￥{{item.mallPrice}})</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
	<!-- 轮播插件 -->
		<!-- <swiperDefault></swiperDefault> -->
	<!-- 楼层 -->
		<floorComponent :floorData="floor1" :floorTitle="floorName.floor1" :floorNum="1"></floorComponent>
		<floorComponent :floorData="floor2" :floorTitle="floorName.floor2" :floorNum="2"></floorComponent>
		<floorComponent :floorData="floor3" :floorTitle="floorName.floor3" :floorNum="3"></floorComponent>
	<!-- 热卖商品 -->
		<div class="hot-area">
			<div class="hot-title">
				<span class="triangle"></span>热卖商品
			</div>
			<div class="hot-goods">
				<van-list>
					<!-- gutter设置左右padding为10`<van-row gutter="20">-->
					<van-row >
						<van-col class="hotStyle" span="12" v-for="(item,index) in hotGoods" :key="index">
							<goodsInfo :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goodsInfo>
						</van-col>
					</van-row>
				</van-list>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import 'swiper/dist/css/swiper.css'
	import { swiper,swiperSlide } from 'vue-awesome-swiper'

	// 引入轮播组件
	import swiperDefault from '../swiper/swiperDefault'
	//引入页面子组件
	import floorComponent from '../component/floorComponent'
	import goodsInfo from '../component/goodsInfoComponent'
	//引入过滤器
	import {toMoney} from '@/filter/moneyFilter.js'
	//引入接口文件
	import url from '@/serviceAPI.config.js'

	export default{
		created(){
			axios({
				url:url.getShoppingMallInfo,
				method:'get',
			}).then(response =>{
				// console.log(response)
				if(response.status == 200){
					this.category = response.data.data.category;
					this.adBanner = response.data.data.advertesPicture;
					this.recommendGoods = response.data.data.recommend;
					this.floor1 = response.data.data.floor1;
					this.floor2 = response.data.data.floor2;
					this.floor3 = response.data.data.floor3;
					this.floorName = response.data.data.floorName;
					this.hotGoods = response.data.data.hotGoods;
				}
			}).catch((error)=>{

			})
		},
		components:{
			swiper,swiperSlide,swiperDefault,floorComponent,goodsInfo
		},
		filters:{
			moneyFilter(money){
				return toMoney(money)
			}
		},
		data(){
			return {
				slide:[1,2,3,4,5,6],
				swiperOption:{
					//一行显示三个
		    		slidesPerView:3
		    	},
				locationIcon:require('../../assets/images/location.png'),
				bannerPicArray:[
					{imageUrl:require('../../assets/images/shopVuePic001.jpg')},
		      		{imageUrl:require('../../assets/images/shopVuePic002.jpg')},
		      		{imageUrl:require('../../assets/images/shopVuePic003.jpg')}
				],
				category:[],
				adBanner:'',
				recommendGoods:[],
				floor1:[],
				floor2:[],
				floor3:[],
				floorName:'',
				hotGoods:[],
			}
		},
		
	}
</script>
<style>
/*三角形*/
.triangle{
	width:0;
	height:0;
	border-left: .5rem solid transparent;
	border-right: .5rem solid transparent;
	border-top: .5rem solid #e5017d;
	display: inline-block;
	margin-right: 3px;}
/*搜索栏-开始*/
.search-bar{
    height: 2.2rem;
    background-color: #e5017d;
    line-height:2.2rem; }
.search-input{
    width:100%;
    height: 1.3rem;
    border-top:0px;
    border-left:0px;
    border-right:0px;
    border-bottom: 1px solid 1px !important ;
    background-color: #e5017d;
    color:#fff;}
.location-icon{
    padding-top: .2rem;
    padding-left: .3rem;}
/*搜索栏-结束*/
/*轮播图-开始*/
.swiper-area{
	overflow: hidden;
	clear: both;}
.type-bar{
	display:flex;
	flex-wrap:row-nowrap;
	background-color: #fff;
	margin:0 .3rem .3rem .3rem;
	border-radius: .3rem;
	font-size: 14px;}
.type-bar div{flex:1;}
/*轮播图-结束*/
/* 推荐板块-开始*/
.recommend-area{
	background-color: #fff;
	margin-top: .3rem;} 
.recommend-title{
	font-size: 14px;
	color: #e5017d;
	border-bottom: 1px solid #eee;
	padding:.2rem;}
.recommend-body{border-bottom: 1px solid #eee;}
.recommend-item{
	width: 99%;
	border-right: 1px solid #eee;
	font-size: 12px;
	text-align: center;}
/*推荐板块-结束*/
/*楼层板块-开始*/
.floor-title{
	color: #e5017d;
	font-size: 14px;
	margin: .4rem;}
.floor-title span{
	background-color: #e5017d;
	color: #fff;
	width:.5rem;
	height:.5rem;
	padding: .2rem;
	margin-right: .3rem;
	border-radius: .7rem;}
/*楼层板块-结束*/
/*商品热卖-开始*/
.hot-area{
	text-align: center;
	font-size: 14px;
	height: 1.8rem;
	line-height: 1.8rem;}
.hot-title{
	color:#e5017d;
	padding: 5px;}
.hot-goods .hotStyle:nth-child(odd){
	border-right: 1px solid #ddd;}
.hot-goods .hotStyle:nth-child(even){
	border-right: 1px solid transparent;}
/*商品热卖-结束*/
</style>
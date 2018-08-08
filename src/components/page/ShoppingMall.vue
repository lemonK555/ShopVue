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
			<div class="recommend-title">商品推荐</div>
			<div class="recommend-body">
				<swiper :options="swiperOption">
					<swiper-slide v-for="(item,index) in recommendGoods" :key="index">
						<div class="recommend-item">
							<img :src="item.image" width="80%">
							<div>{{item.goodsName}}</div>
							<div>￥{{item.price}}(￥{{item.mallPrice}})</div>
						</div>
					</swiper-slide>
				</swiper>
			</div>
		</div>
	<!-- 轮播插件 -->
		<swiperDefault></swiperDefault>
	<!-- 楼层 -->
		<div class="floor">		
			<div class="floor-anomaly">
				<div class="floor-title"><span>1F</span>新鲜水果</div>	
				<div class="floor-common">
					<div class="floor-one" v-for="product in floor1">
						<img :src="product.image" width="100%">
					</div>
				</div>
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
	export default{
		created(){
			axios({
				url:'https://www.easy-mock.com/mock/5b690a9487dadc0640e32b96/shop/index',
				method:'get',
			}).then(response =>{
				// console.log(response)
				if(response.status == 200){
					this.category = response.data.data.category;
					this.adBanner = response.data.data.advertesPicture;
					this.recommendGoods = response.data.data.recommend;
					this.floor1 = response.data.data.floor1;
				}
			}).catch((error)=>{

			})
		},
		components:{
			swiper,swiperSlide,swiperDefault
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
			}
		},
		
	}
</script>
<style>
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
.recommend-area{
	background-color: #fff;
	margin-top: .3rem;}
.recommend-title{
	font-size: 14px;
	color: #e5017d;
	border-bottom: 1px solid #eee;
	padding:.2rem;}
.recommend-body{
	border-bottom: 1px solid #eee;}
.recommend-item{
	width: 99%;
	border-right: 1px solid #eee;
	font-size: 12px;
	text-align: center;}
.floor-common{
	display: flex;
	flex-direction:  row;
	background-color: #fff;
	border-bottom: 1px solid #ddd;}
.floor-title{
	color: #e5017d;
	font-size: 14px;}
.floor-title span{
	background-color: #e5017d;
	color: #fff;
	width:.5rem;
	height:.5rem;
	padding: .2rem;
	margin-right: .3rem;
	border-radius: .6rem;}
.floor-anomaly{
	width:10rem;
	/*flex:1;*/
	}
</style>
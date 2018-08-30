<template>
	<div>
		<!-- 页面标题 -->
		<div class="navbar-div">
			<van-nav-bar
				title="商品详情"
				left-text="返回"
				left-arrow
				@click-left="onClickLeft"
			/>
		</div>
		<!-- 商品内容 -->
		<div class="topImage-div">
			<img :src="goodsInfo.IMAGE1" width="100%">
		</div>
		<div class="goods-name">{{goodsInfo.NAME}}</div>
		<div class="goods-price">价格：{{goodsInfo.PRESENT_PRICE|moneyFilter}}元</div>
		<div>
			<!-- swipeable实现滑动切换tab,sticky粘性布局:tab滚动到顶部回自动吸顶 -->
			<van-tabs swipeable sticky>
				<van-tab title="商品详情">
					<div class="detail" v-html="goodsInfo.DETAIL">
						
					</div>
				</van-tab>
				<van-tab title="评论">
					评论制作中
				</van-tab>
			</van-tabs>
		</div>

		<div class="goods-bottom">
			<div>
				<van-button size="large" type="primary" @click="addGoodsToCart">加入购物车</van-button>
			</div>
			<div>
				<van-button size="large" type="danger">直接购买</van-button>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	import url from '@/serviceAPI.config.js'
	import {Toast} from 'vant'
	import {toMoney} from '@/filter/moneyFilter.js'

	export default{
		data(){
			return {
				goodsId:'',
				goodsInfo:{},//商品详细信息
			}
		},
		filters:{
			moneyFilter(money){
				return toMoney(money)
			}
		},
		created(){
			this.goodsId = this.$route.query.goodsId ? this.$route.query.goodsId:this.$route.params.goodsId
			this.getInfo()
		},
		methods:{
			getInfo(){
				axios({
					url:url.getDetailGoodsInfo,
					method:'POST',
					data:{
						goodsId:this.goodsId,
					}
				}).then(response=>{
					console.log(url.getDetailGoodsInfo)
					console.log(response.data.code)
					if(response.data.code == 200){
						this.goodsInfo = response.data.message
					}else{
						Toast('服务器错误，数据获取失败')
					}
					console.log(this.goodsInfo)
				}).catch(error=>{
					console.log(error)
				})
			},
			onClickLeft(){
				this.$router.go(-1)
			},
			addGoodsToCart(){
				//取出购物车中的商品
				let cartInfo = localStorage.cartInfo ? JSON.parse(localStorage.cartInfo) : []
				//判断购物车内是否已经有这个商品
				//如果没有返回true，有返回第一个查找到的数据
				let isHaveGoods = cartInfo.find(cart=>cart.goodsId == this.goodsId)
				console.log(isHaveGoods)
				console.log(this.goodsInfo)
				if(!isHaveGoods){
					let newGoodsInfo = {
						goodsId:this.goodsInfo.ID,
						name:this.goodsInfo.NAME,
						price:this.goodsInfo.PRESENT_PRICE,
						image:this.goodsInfo.IMAGE1,
						count:1
					}
					cartInfo.push(newGoodsInfo)//添加到购物车
					localStorage.cartInfo = JSON.stringify(cartInfo)//操作本地数据
					Toast.success('添加成功')
				}else{
					Toast.success('已有此商品')
				}
				this.$router.push({name:'cart'})//进行跳转
			}
		},
	}
</script>
<style scoped>
	.goods-name{background-color: #fff;}
	.goods-price{background-color: #fff;}
	.detail{font-size: 0px;}
	.goods-bottom{
		position: fixed;
		bottom: 0px;
		left:0px;
		background-color: #FFF;
		width:100%;
		display: flex;
		flex-direction: row;
		flex-flow: nowrap;}
	.goods-bottom > div{
		flex:1;
		padding: 5px;}
</style>
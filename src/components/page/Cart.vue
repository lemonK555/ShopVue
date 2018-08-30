<!-- 这是购物车 -->
<template>
	<div>
		<div class="navbar-div">
			<van-nav-bar title="购物车"></van-nav-bar>
		</div>
		<!-- 清空购物车 -->
		<div class="cart-title">
			<van-button
				size="small"
				type="danger"
				@click="clearCart">
				清空数据库
			</van-button>
		</div>
		<!-- 显示购物车中的商品 -->
		<div class="cart-title">
			<div class="lkj-row" v-for="(item,index) in cartInfo" :key="index">
				<div class="lkj-img">
					<img :src="item.image" width="100%">
				</div>
				<div class="lkj-text">
					<div class="lkj-goods-name">{{item.name}}</div>
					<div class="lkj-control">
						<van-stepper v-model="item.count"></van-stepper>
					</div>
				</div>
				<div class="lkj-goods-price">￥{{item.price|moneyFilter}}</div>
				<div>*{{item.count}}</div>
				<div class="allPrice">
					￥{{item.price*item.count|moneyFilter}}
				</div>
			</div>
		</div>
		<!-- 显示总金额 -->
		<div class="totalMoney">
			商品总价：￥{{totalMoney|moneyFilter}}
		</div>
	</div>
</template>
<script>
	import {toMoney} from '@/filter/moneyFilter.js'
	export default{
		data(){
			return{
				cartInfo:[],//购物车内的商品
				isEmpty:false,//购物车是否为空，为空显示false
			}
		},
		created(){
			this.getCartInfo()
		},
		filters:{
			moneyFilter(money){
	            return toMoney(money)
	        }
		},
		methods:{
			//得到购物车的商品
			getCartInfo(){
				//判断localStorage里是否有购物车数据
				if(localStorage.cartInfo){
					//如果有数据，去除并赋值给cartInfo
					this.cartInfo = JSON.parse(localStorage.cartInfo)
				}
				console.log('this.cartInfo:'+JSON.stringify(this.cartInfo))
				this.isEmpty = this.cartInfo.length>0 ? true:false
			},
			//清空购物车的商品
			clearCart(){
				localStorage.removeItem('cartInfo')
				this.cartInfo = []
			}
		},
		computed:{
			totalMoney(){
				let allMoney = 0
				this.cartInfo.forEach((item,index)=>{
					allMoney += item.price*item.count
				})
				localStorage.cartInfo = JSON.stringify(this.cartInfo)
				return allMoney
			},
		},

	}
</script>
<style scoped>
	.card-title{
	    height: 2rem;
	    line-height:2rem;
	    background-color: #fff;
	    border-bottom:1px solid #E4E7ED;
	    padding:5px;
	    text-align: right;
	}
	.cart-list{
	    background-color: #fff;
	}
	.lkj-row{
	    display: flex;
	    flex-direction: row;
	    flex-wrap:nowrap;
	    padding:0.5rem;
	    font-size:0.85rem;
	    border-bottom:1px solid #E4E7ED;
	}
	.lkj-img{
	    flex:6;
	}
	.lkj-text{
	    flex:14;
	    padding-left:10px;
	}
	.lkj-control{
	    padding-top: 10px;
	}
	.lkj-goods-price{
	    flex:4;
	    text-align: right;
	}
	.totalMoney{
	    text-align: right;
	    background-color: #fff;
	     border-bottom:1px solid #E4E7ED;
	     padding: 5px;
	}
</style>
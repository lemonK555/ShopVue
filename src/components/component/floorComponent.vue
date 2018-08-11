<template>
	<div class="floor">		
		<div class="floor-title"><span>{{floorNum}}F</span>{{floorTitle}}</div>
		<!-- 前三个不规则布局 -->
		<div class="floor-anomaly">
			<div class="floor-one">
				<img :src="floorData0.image" width="100%">
			</div>
			<div>
	            <div class="floor-two">
		            <img :src="floorData1.image" width="100%" />
		        </div>
	            <div>
		            <img :src="floorData2.image" width="100%" />
	            </div>
	        </div>
		</div>
		<!-- 从第四个开始规则排列 -->
		<div class="floor-rule">
            <div v-for="(item ,index) in floorData.slice(3)" :key="index">
                <img :src="item.image" width="100%"/>
            </div>
        </div>
	</div>
</template>
<script>
	export default{
		props:['floorData','floorTitle','floorNum'],
		watch:{
			floorData:function(val){
				console.log(this.floorData)
				this.floorData0 = this.floorData[0];
				this.floorData1 = this.floorData[1];
				this.floorData2 = this.floorData[2];
			}
		},
		data(){
			return{
				floorData0:{},
				floorData1:{},
				floorData2:{}
			}
		},
	}
</script>
<style scoped>
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
	.floor-anomaly{
		display: flex;
		flex-direction:  row;
		background-color: #fff;
		border-bottom: 1px solid #ddd;}
	.floor-anomaly div{
		width:10rem;
		box-sizing: border-box;
	    -webkit-box-sizing: border-box;
	}
	.floor-one{border-right:1px solid #ddd;}
	.floor-two{border-bottom:1px solid #ddd;}
	.floor-rule{
	  	display: flex;
	  	flex-direction: row;
	  	flex-wrap:wrap;
	  	background-color: #fff;}
	.floor-rule div{
	  	-webkit-box-sizing: border-box;
	  	box-sizing: border-box;
	  	width:10rem;
	  	border-bottom:1px solid #ddd;}
	/*odd表示奇数，1开始*/
	.floor-rule div:nth-child(odd){border-right: 1px solid #ddd;}
</style>
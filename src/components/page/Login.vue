<template>
	<div>
		<van-nav-bar 
			title="用户登陆" 
			left-text="返回" 
			left-arrow 
			@click-left="goBack" />
		<div class="register-panel">
			<van-field 
				v-model="username"
				label="用户名"
				icon="clear"
				placeholder="请输入用户名"
				required
				@click-icon="username = ''"
				:error-message="usernameErrorMsg"/>
			<van-field 
				v-model="password"
				type="password"
				label="密码"
				placeholder="请输入用户名"
				required
				:error-message="passwordErrorMsg"/>
			<div class="register-button">
				<van-button type="primary" @click="loginAction" :loading="openLoading" size="large">登陆</van-button>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from 'axios'
	//引入接口配置文件
	import url from '@/serviceAPI.config.js'
	//按需引用vant组件
	import {Toast} from 'vant'
	export default{
		data(){
			return{
				username:'',
				password:'',
				openLoading: false,//避免重复提交
				usernameErrorMsg:'',//当用户名出现错误时
				passwordErrorMsg:'',//当密码出现错误时
			}
		},
		created(){
			//已登录后返回登陆页面，会提示已经登陆
			if(localStorage.userInfo){
				Toast.success('您已经登陆')
				this.$router.push('/')
			}
		},
		methods:{
			goBack(){
				this.$router.go(-1)
			},
			loginAction(){
				this.checkForm()&&this.axiosLoginUser()
			},
			axiosLoginUser(){
				this.openLoading = true
				axios({
					url:url.loginUser,
					method:'POST',
					data:{
						username:this.username,
						password:this.password,
					},
				}).then(response =>{
					console.log(response)
					//如果返回code为200，代表注册成功，我们给用户作Toast提示
			        if(response.data.code == 200&& response.data.message){
			        	//登陆成功后，保存用户登陆状态
			        	new Promise((resolve,reject)=>{
			        		localStorage.userInfo = {username:this.username}
			        		setTimeout(()=>{
			        			resolve()
			        		},500)
			        	}).then(()=>{
			        		Toast.success('登陆成功')
			            	this.$router.push('/')
			        	}).catch(err=>{
			        		Toast.fail('登陆状态保存失败')
			        		console.log(err)
			        	})
			            
			        }else{
			            Toast.fail('登陆失败')
			            this.openLoading = false
			        }
            			console.log(response.data.code)
				}).catch((error) =>{
					console.log(error+"抛出异常")
					this.openLoading = false
				})
			},
			checkForm(){
				let isOk = true
				if(this.username.length<5){
					this.usernameErrorMsg = "用户名不能小于5位"
					isOk = false
				}else{
					this.usernameErrorMsg = ''
				}
				if(this.password.length<6){
					this.passwordErrorMsg = "密码不能少于6位"
					isOk = false
				}else{
					this.passwordErrorMsg = ''
				}
				return isOk
			},
		},
	}
</script>
<style scoped>
	.register-panel{
        width:96%;
        border-radius: 5px;
        margin:20px auto;
        padding-bottom:50px;
    }
    .register-button{
        padding-top:10px;
    }
</style>
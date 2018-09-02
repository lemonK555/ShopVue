const Router = require ('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
router.post('/register',async(ctx)=>{
	console.log('这是注册')
	//取得Model
	const User = mongoose.model('User')
	//从前端接受的post数据封装成一个新的user对象
	let newUser = new User(ctx.request.body)
	console.log("这是新增的数据："+newUser)
	//把mongoose的save方法直接存储，人后判断是否成功，返回相应的结果
	await newUser.save().then(()=>{
		//成功返回cade=200，并返回成功信息
		ctx.body={
			code:200,
			message:'注册成功'
		}
	}).catch(error=>{
		//失败返回code=500，并返回错误信息
		ctx.body={
			code:500,
			message:error+'存储失败'
		}
	})
})
router.post('/login',async(ctx)=>{
	//得到前端的数据
	let loginUser = ctx.request.body
	console.log(loginUser)
	let username = loginUser.username
	let password = loginUser.password
	//引入User的model
	const User = mongoose.model('User')
	//查找用户名是否存在，存在比对密码
	await User.findOne({"username":username}).exec().then(async(result)=>{
		console.log(result)
		if(result){
			let newUser = new User()
			await newUser.comparePassword(password,result.password)
			.then((isMatch)=>{
				//返回对比结果
				ctx.body = {code:200,message:isMatch}
			})
			.catch(error=>{
				console.log(error)
				ctx.body = {code:500, message:error}
			})
		}else{
			ctx.body = {code:200, message:'用户名不存在'}
		}
	}).catch(error=>{
		console.log(error)
		ctx.body = {code:500, message:error}
	})
})
module.exports=router;
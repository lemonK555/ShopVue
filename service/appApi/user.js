const Router = require ('koa-router')
const mongoose = require('mongoose')
// const bodyParser = require('koa-bodyparser')
// app.use(bodyParser())

let router = new Router()
router.get('/',async(ctx)=>{
    ctx.body="这是用户操作首页"
})
// router.get('/register',async(ctx)=>{
//     ctx.body="用户注册接口"
// })
router.post('/register',async(ctx)=>{
	//取得Model
	const User = mongoose.model('User')
	//从前端接受的post数据封装成一个新的user对象
	let newUser = new User(ctx.request.body)
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
			message:error
		}
	})
	

})
module.exports=router;
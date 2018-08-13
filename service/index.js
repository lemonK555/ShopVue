const Koa = require('koa')
const app = new Koa()
const {connect,initSchemas} = require('./database/init.js')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')

app.use(bodyParser());
app.use(cors());

//引入
let user = require('./appApi/user.js')

//装载所有子路由
let router = new Router();
router.use('/user',user.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())
router.post('/', async function (ctx) {
    ctx.body = '恭喜 __小简__ 你成功登陆了'
});


;(async()=>{
	// await connect()
	// initSchemas()
    console.log('连接上了吗？')
})();

app.use(async(ctx)=>{
        ctx.body='<h1>404!</h1>';
    }
	// ctx.body = '<h1>hello Koa2 嘤嘤嘤</h1>'
});

app.listen(3000,()=>{
	console.log('[Service] starting at port 3000')
});






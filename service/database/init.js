// 用作数据库的连接和初始化
const mongoose = require('mongoose')
const db = "mongodb://localhost/shop-vue"
const glob = require('glob')		//允许使用*来写glob规则
const {resolve} = require('path')	//将一系列路径或路径段解析为绝对路径

mongoose.Promise = global.Promise

//一次性引入所有的Schma文件
exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

exports.connect = ()=>{
	//连接数据库
	mongoose.connect(db)
	let maxConnectTimes = 0

	return new Promise((resolve,reject)=>{
		//增加数据库连接的事件监听
		mongoose.connection.on('disconnected',()=>{
			console.log('**********数据库断开**********')
			if(maxConnectTimes<=3){
				maxConnectTimes++
				//进行重连
				mongoose.connect(db)
			}else{
				reject()
				throw new Error('数据库出现问题，程序无法搞定，请人为修理……')
			}
			
		})
		//数据库出现错误的时候
		mongoose.connection.on('error',err=>{
			console.log('**********数据库错误**********')
			if(maxConnectTimes<=3){
				maxConnectTimes++
				mongoose.connect(db)
			}else{
				reject(err)
				throw new Error('数据库出现问题，程序无法搞定，请人为修理……')
			}
			mongoose.connection(db)
		})
		//链接打开的时候
		mongoose.connection.once('open',()=>{
			console.log('MongoDB Connection successfully!')
			resolve()
		})
	})
	
}
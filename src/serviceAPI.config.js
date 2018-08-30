const BASEURL = "https://www.easy-mock.com/mock/5b690a9487dadc0640e32b96/shop/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',//用户注册接口
    loginUser:LOCALURL+'user/login',//用户登陆接口
    getDetailGoodsInfo:LOCALURL+'goods/getDetailGoodsInfo',//商品详情接口
    getCategoryList:LOCALURL+'goods/getCategoryList',//得到大类信息
    getCategorySubList:LOCALURL+'goods/getCategorySubList',//得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',//得到小类商品信息
}

module.exports = URL
const BASEURL = "https://www.easy-mock.com/mock/5b690a9487dadc0640e32b96/shop/"
const LOCALURL = "http://localhost:3000/"
const URL = {
    getShoppingMallInfo:BASEURL+'index',
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser:LOCALURL+'user/register',//用户注册接口
}

module.exports = URL
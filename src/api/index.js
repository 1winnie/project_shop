// 当前模块：API接口进行统一管理
import requests from './request';
import mockRequests from './mockAjax'
// 三级联动接口
///三级菜单的请求地址api/product/getBaseCategoryList get 无参数
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发起ajax请求
// 当前这个函数只需要把服务器返回结果返回即可
export const reqCategoryList = ()=>{
    // 发请求:axios发送请求返回结果是Promise对象
    return  requests(
        {
            url:'/product/getBaseCategoryList',
            method:'get',
        })
}
// 获取banner（Home首页轮播图接口）
export const reqGetBannerList = ()=> mockRequests.get('/banner')
// 获取floor（Home首页floor接口)
export const reqFloorList = () => mockRequests.get('/floor')
// 获取搜索模块数据 地址：/api/list 请求方式 post 参数：需要带参数
// 当前这个接口（获取搜索模块的数据），给服务器传递一个默认参数【至少是一个空对象】
export const reqSearchInfo = (params) => requests({
    url:'/list',
    method:'post',
    data:params
})
// 获取产品详细信息的接口
export const reqGoodsInfo = (skuId)=>requests({url:`/item/${skuId}`,methods:'get'})
// 将产品添加到购物车中（获取更新某一产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=>requests({url:`/cart/addToCart/${skuId}/${skuNum}`,method:"post"})
// 获取购物车列表数据接口
export const reqCartList = ()=>requests({url:'/cart/cartList',methods:'get'})
// 删除购物产品的接口
export const reqDleteCartById = (skuId)=>requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 修改商品选择的状态
export const reqUpdateCheckedByid = (skuId,isChecked)=>requests({url:`/cart//checkCart/${skuId}/${isChecked}`,method:'get'})
// 获取验证码接口
export const reqGetCode = (phone)=>requests({url:`/user/passport/sendCode/${phone}`,method:'get'}) 
// 注册接口
export const reqUserRegister = (data)=>requests({url:'/user/passport/register',data,method:'post'})
// 登录接口
export const reqUserLogin = (data)=>requests({url:'/user/passport/login',data,method:'post'})
// 获取用户信息【需要带着用户的token向服务器要用户信息】但是这个接口没有带参数，所以用请求头带参数
export const reqUserInfo = ()=>requests({url:'/user/passport/auth/getUserInfo',method:'get'})
// 退出登录
export const reqLogout = ()=>requests({url:'/user/passport/logout',method:'get'})
// 获取用户地址信息
export const reqAddressInfo = ()=>requests({url:'/user/userAddress/auth/findUserAddressList',method:'get'})
// 获取用户商品清单
export const reqOrderInfo = ()=>requests({url:'/order/auth/trade',method:'get'})
// 提交订单的接口
export const reqSubmitOrder = (tradeNo,data)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data,method:'post'})
// 获取支付信息
export const reqPayInfo = (orderId)=>requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'})
// 获取支付订单状态
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryStatus/${orderId}`,method:'get'})
// 获取我的订单列表
export const reqMyOrderList = (page,limit)=>requests({url:`/order/auth/${page}/${limit}`,method:'get'})


























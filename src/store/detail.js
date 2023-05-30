import {reqGoodsInfo,reqAddOrUpdateShopCart} from '@/api'
// 封装游客身份模块uuid---->生成一个随机字符串（不能再变了）
import {getUUID} from '@/utils/uuid_token'
// home模块的小仓库
export default{
    state : {
       goodInfo:{},
       uuid_token:getUUID()
    },
     
    actions : {
        // 获取产品信息的action
       async getGoodsInfo({commit},skuId){
            let result = await reqGoodsInfo(skuId);
            if(result.code == 200){
                commit("GETGOODSINFO",result.data)
            }
        },
        // 将产品添加到购物车中
        // 加入购物车以后（发送请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表这次操作成功
        // 因为服务器没有返回其余的数据，因此这里不需要三连环存储数据
        async addOrUpdateShopCart({commit},{skuId,skuNum}){
            let result = await reqAddOrUpdateShopCart(skuId,skuNum);
            if(result.code == 200){
                return "ok"
              }else{
                // 代表加入购物车失败
                return Promise.reject(new Error('faile'));
              }
        }
        // async返回的一定是Promise
    },
    mutations :{
        GETGOODSINFO(state,goodInfo){
            state.goodInfo = goodInfo
        }
    },
    // 计算属性
    // 项目当中getters主要作用是:简化仓库中的数据
    // 方便组件获取数据
    getters : {
        // 路径导航简化数据
        categoryView(state){
            // 比如：state.goodInfo初识状态空对象，空对象的catoryView属性值为undefined，所以至少为一个空对象，不然控制台会有警告
            return state.goodInfo.categoryView||{};
        },
        // 简化产品信息数据
        skuInfo(state){
            return state.goodInfo.skuInfo||{};
        },
        // 产品售卖属性的简化
        spuSaleAttrList(state){
            return state.goodInfo.spuSaleAttrList||[]
        }
    }
}

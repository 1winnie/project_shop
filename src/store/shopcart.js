import { reqCartList, reqDleteCartById, reqUpdateCheckedByid } from '@/api'
// home模块的小仓库
export default {
    state: {
        cartList: []
    },
    actions: {
        // 获取购物车列表数据
        async getCartList({ commit }) {
            let result = await reqCartList()
            if (result.code == 200) {
                commit("GETCARTLIST", result.data)
            }
        },
        //    删除购物车某一产品
        async deleteCartListById({ commit }, skuId) {
            let result = await reqDleteCartById(skuId)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        //    修改购物车某一个产品选中的状态
        async updateCheckedById({ commit }, { skuId, isChecked }) {
            let result = await reqUpdateCheckedByid(skuId, isChecked)
            if (result.code == 200) {
                return 'ok'
            } else {
                return Promise.reject(new Error('faile'))
            }
        },
        // 删除全部勾选的产品
        // 没有统一删除全部的接口，但是有一下子删除一个的接口，所以要调用deleteCartListById多次，才能删除全部
        deleteAllCheckedCart({dispatch, getters}) {
            // context:小仓库，commit，getters，dispatch【派发action】，state【当前仓库数据】
            //获取购物车中全部的产品（是一个数组） 
            let promiseAll = [];
            getters.cartList.cartInfoList.forEach(item => {
             let promise = item.isChecked==1?dispatch('deleteCartListById',item.skuId):'';
                // 将每一次返回的promise添加到promiseAll数组中
                promiseAll.push(promise)
            })
            // 只要全部的p1|p2...都成功，返回结果即为成功
            // 如果有一个失败，返回即为失败
            return Promise.all(promiseAll)
        },
        // 修改全部产品的状态
        updateAllCartIsChecked({dispatch,state},isChecked){
            // 数组
            let promiseAll = []
            state.cartList[0].cartInfoList.forEach(item=>{
              let promise = dispatch('updateCheckedById',{skuId:item.skuId,isChecked})
                promiseAll.push(promise)
            });
            // 最终返回结果
            return Promise.all(promiseAll);
        },
    },
    mutations: {
        GETCARTLIST(state, cartList) {
            state.cartList = cartList
        }
    },
    // 计算属性
    // 项目当中getters主要作用是:简化仓库中的数据
    // 方便组件获取数据
    getters: {
        cartList(state) {
            return state.cartList[0] || {}
        }
    }
}

import {reqSearchInfo} from '@/api'
// home模块的小仓库
export default{
    state : {
        searchList:{}
    },
     
    actions : {
        // 获取search模块数据
        async getSearchList({commit},params={}){
            // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
            let result = await reqSearchInfo(params);
            if(result.code == 200){
                commit("GETSEARCHLIST",result.data)
            }
        }
    },
    mutations :{
        GETSEARCHLIST(state,searchList){
            state.searchList = searchList
        }
    },
    // 计算属性
    // 项目当中getters主要作用是:简化仓库中的数据
    // 方便组件获取数据
    getters : {
        // 当前形参state，当前仓库中的state，并非大仓库的state
        goodsList(state){
            return state.searchList.goodsList;
        },
        attrsList(state){
            return state.searchList.attrsList
        },
        trademarkList(state){
            return state.searchList.trademarkList
        },
    }
}

import {reqCategoryList,reqGetBannerList,reqFloorList} from '@/api'
// home模块的小仓库
export default{
    state : {
        //home仓库中存储三级菜单数据
        categoryList:[],
        // 轮播图的数据
        BannerList:[],
        // floor的数据
        FloorList:[]
    },
     
    actions : {
        // 通过api里面的接口函数调用，向服务器发请求，获取服务器的数据
       async categoryList(context){
            let result =await reqCategoryList();
            if(result.code == 200){
                context.commit("CATEGORYLIST",result.data)
            }
        },
        async getBannerList(context){
            let result = await reqGetBannerList();
            if(result.code == 200){
                context.commit("GETBANNERLIST",result.data)
            }
        },
        async getFloorList(context){
            let result = await reqFloorList();
            console.log(result)
            if(result.code == 200){
                context.commit("GETFLOORLIST",result.data)
            }
        }
    },
    mutations :{
        CATEGORYLIST(state,categoryList) {
            state.categoryList = categoryList
        },
        GETBANNERLIST(state,BannerList){
            state.BannerList = BannerList
        },
        GETFLOORLIST(state,FloorList){
            state.FloorList = FloorList
        },
    },
    getters : {}
}

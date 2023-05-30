import Vue from 'vue'
import VueRouter from 'vue-router'

// 使用插件
Vue.use(VueRouter);
// 引入路由组件
// import Home from '@/pages/Home'
// import Login from '@/pages/Login'
// import Register from '@/pages/Register'
// import Search from '@/pages/Search'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'
// import GroupOrder from '@/pages/Center/groupOrder';
// import MyOrder from '@/pages/Center/myOrder';
import store from '@/store';
let router = new VueRouter({
    // 配置路由
    routes:[
        {
            path:'/center',
            name:'center',
            component:()=>import("@/pages/Center"),
            meta:{showFooter:true},
            // 二级路由组件
            children:[
                {
                    path:'myorder',
                    component:()=>import("@/pages/Center/myOrder"),
                },
                {
                    path:'grouporder',
                    component:()=>import("@/pages/Center/groupOrder")
                },
                // 重定向
                {
                    path:'/center',
                    redirect:'/center/myorder'
                }
            ]
        },
        {
            path:'/paysuccess',
            name:'paysuccess',
            component:()=>import("@/pages/PaySuccess"),
            meta:{showFooter:true}
        },
        {
            path:'/SyncTest',
            name:'synctest',
            component:()=>import("@/pages/SyncTest"),
            meta:{showFooter:true}
        },
        {
            path:'/pay',
            name:'pay',
            component:()=>import("@/pages/Pay"),
            meta:{showFooter:true},
             // 路由独享
             beforeEnter:(to,from,next) => {
                // 去交易页面，必须是从购物车而来
                if(from.path == "/trade"){
                    next();
                }else{
                    // 其他路由组件而来，停留在当前
                    next(false)
                }
            }
        },
        {
            path:'/trade',
            name:'trade',
            component:()=>import("@/pages/Trade"),
            meta:{showFooter:true},
            // 路由独享
            beforeEnter:(to,from,next) => {
                // 去交易页面，必须是从购物车而来
                if(from.path == "/shopcart"){
                    next();
                }else{
                    // 其他路由组件而来，停留在当前
                    next(false)
                }
            }
        },
        {
            path:'/shopcart',
            name:'shopcart',
            component:()=>import("@/pages/ShopCart"),
            meta:{showFooter:true}
        },
        {
            path:'/addcartsuccess',
            name:'addcartsuccess',
            component:()=>import("@/pages/AddCartSuccess"),
            meta:{showFooter:true}
        },
        {
            path:'/detail/:skuid',
            component:()=>import("@/pages/Detail"),
            meta:{showFooter:true}
        },
        {
            path:'/home',
            component:()=>import("@/pages/Home"),
            meta:{showFooter:true}
        },
        {
            path:'/login',
            component:()=>import("@/pages/Login"),
            meta:{showFooter:false}
        },
        {
            path:'/register',
            component:()=>import("@/pages/Register"),
            meta:{showFooter:false}
        },
        {
            name:'Search',
            path:'/search:keyword?',
            component:()=>import("@/pages/Search"),
            meta:{showFooter:true}
        },
        // 重定向，在项目跑起来的时候，访问/，立马让它定向到首页
        {
            path:'*',
            redirect:'/home'
        }
    ],
    // 滚动行为
    scrollBehavior(to,from,savedPosition){
        return {y: 0};
    }
})
// 全局守卫：前置守卫（在路由跳转之前进行判断）
router.beforeEach(async(to,from,next)=>{
    // to:可以获取到你要跳转的路由信息
    // from：可以获取到你从哪来的路由信息
    // next：放行函数，next（）：直接放行；next（‘/login’）放行指定的路由；next（false）；
    // 用户登录了，才会有token，未登录一定不会有token
    let token = store.state.user.token;
    // userInfo有才能跳转,但是不能通过userInfo去判断，因为它为空，也是真，是空对象
    // 所以用userInfo里面的name属性有没有值去判断
    let name = store.state.user.userInfo.name;
    // 用户已经登录了
    if(token){
        // 用户已经登录了还想去login，休想！[不能去，停留在首页]
       
            // 登陆了，但去的不是login
            // 如果用户名已有
            if(name){
                if(to.path == '/login'||to.path=='/register'){
                    next('/home')
                } else{
                next();}
            }else{
                // 登陆了没有用户信息，派发action让仓库存储用户信息再跳转
                // 获取用户信息
               try {
                // 获取用户信息成功
                await store.dispatch('getUserInfo');
                next();
               } catch (error) {
                //  token失效了（隔一段时间需要重新登录）,
                // 获取不到用户信息，需重新登录
                // 清除token
                await store.dispatch('userLogout');
                next('/login')
               }

            }

    }
    else{
        // 没有登录,不能去交易相关，不能去支付先关，不能去个人中心
        // 上面的路由一个跳转到--登录页面
        console.log(to.path)
        let toPath = to.path;// /xxx
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1){
            next('/login?redirect' + toPath)
        }else{
            // 去别的页面
            next()
        }
        
    }
    
})
export default router;
<template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
            <div class="container">
                <!-- 利用商品的委派--鼠标离开父盒子才会移除盒子背景事件 -->
               <div @mouseleave="leaveShow" @mouseenter="enterShow" >
                    <h2 class="all">全部商品分类</h2>
                    <!-- 三级联动 -->
                    <!-- 过渡动画 -->
                    <transition name="sort">
                        <div class="sort" v-show="show">
                        <!-- 防止抖动：最终的解决方案是委派 和 自定义属性-->
                        <div class="all-sort-list2" @click="goSearch">
                            <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId"
                            :class="{cur:currentIndex==index}">
                               <!--一级分类  -->
                            <h3 @mouseenter="changeIndex(index)">
                                    <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                                </h3>
                                <!-- 二、三级分类 -->
                                <div class="item-list clearfix" :style="{display:currentIndex == index ?'block':'none'}">
                                    <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                                        <dl class="fore">
                                            <dt>
                                                <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                            </dt>
                                            <dd>
                                                <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                                                    <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                                </em>
                                                
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </transition>
               </div>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                
            </div>
     </div>
</template>

<script>
import { mapState } from 'vuex';
// 引入方式，把lodash全部功能函数引入进来
// import _ from 'lodash';
// 按需加载,节流函数-throttle,而且throttle是默认暴露，不需要加{}引入
import throttle from "lodash/throttle";
export default {
    name:'TypeNav',
    data(){
        return{
            currentIndex:-1,
            show:true
        }
    },
    // 组件挂载完毕：可以向服务器发请求
   mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库当中
//    因为不管谁引用TypeNav都会向服务器发送请求，所有为了提高性能，就在app中的moute发送一次
    // this.$store.dispatch('categoryList')
    // 当组件挂载完毕，让show属性变为false（当进入search页面也会挂载一次）
    if(this.$route.path!='/home'){
        this.show = false;
    }
   },
   computed:{
        ...mapState({
            // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
            // 注入一个参数state，其实即为大仓库中的数据
            categoryList:state=>state.home.categoryList
        })
   },
   methods:{
    // 鼠标进入修改响应式数据currentIndex属性
    // es6的写法
    // changeIndex(index){
    //     // index：鼠标移上某一个一级分类的元素的索引值
    //     this.currentIndex = index
    // },
    // 应使用es5的写法，key：value
    // throttle回调函数别用箭头函数，可能会出现上下文this指向问题
    changeIndex:throttle(function (index){
        this.currentIndex = index
    },50),
   
    goSearch(event){
        // 确定点击的是a，加上自定义data-categoryName，其余属性没有
        let element = event.target;
        // 解构element.dataset里面的对象categoryName(浏览器自动转化为小写)
        let {categoryname,category1id,category2id,category3id} = element.dataset;
        // 如果标签身上拥有categoryname一定是a标签
        if(categoryname){
            // 整理路由器跳转的参数
            let location = {name:"Search"};
            let query = {categoryName : categoryname}
            // 一级、二级、三级分类
            if(category1id){
                query.category1Id = category1id
            }else if(category2id){
                query.category2Id = category2id
            }else{
                query.category3Id = category3id
            }
            // 整理完参数
            // 判断：如果路由跳转的时候，带有params参数，也传递过去
            location.params = this.$route.params;
            location.query = query;
            // console.log(location)
            // 路由跳转
            this.$router.push(location)
        
        }
    },
    enterShow(){
        this.show = true;
    },
    leaveShow(){
        this.currentIndex = -1;
        if(this.$route.path != "/home") {
            this.show = false;
        }
    }
   }
}
</script>

<style scope lang="less">
    
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;
           
            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }
            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;
                
                .all-sort-list2 {
                    
                    .item {
                        h3 {
                            line-height: 27px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }
                        
                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                            
                        }

                    }
                    .cur{
                            background-color: pink;
                        }
                        a{
                                cursor: pointer;
                            }
                }
            }
            // 过渡动画进入的开始状态
            .sort-enter{
                height: 0px;
            }
            // 过渡动画介结束状态
            .sort-enter-to{
                height: 461px;
            }
            // 定义动画时间、速率
            .sort-enter-active{
                transition: all .5s linear;
            }
            // 过渡动画离开的开始状态
            .sort-leave{
                height: 461px;
            }
            // 过渡动画离开结束状态
            .sort-leave-to{
                height: 0px;
            }
            // 定义动画时间、速率
            .sort-leave-active{
                transition: all .5s linear;
            }
        }
    }
</style>
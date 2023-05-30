import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from '@/router'
// 三级联动组件--全局组件
import TypeNav from '@/components/TypeNav';
// 轮播图--全局组件
import Carousel from '@/components/Carousel';
// 分页器--全局组件
import Pagination from '@/components/Pagination';
import { MessageBox} from 'element-ui';
// import {Pagination} from 'element-ui';
 // 第一个参数：全局组件的名字name，第二个参数：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// Vue.use(Pagination);
// 引入仓库
import store from '@/store'
Vue.config.productionTip = false
// this.$store.dispatch('categoryList')
// main.js也只会执行一次，但是这里的this指向是undefined，只有组件才有this.$route
// 引入MockServe.js----mock数据
import '@/mock/mockServe';
// 引入样式
import "swiper/css/swiper.min.css";
// 统一接口api文件夹里面的全部请求函数
import * as API from '@/api';
import banana from '@/assets/1.gif'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload';
// 注册插件
Vue.use(VueLazyload,{
  // 添加加载默认的图片
  loding:banana
});
// 引入表单效验插件
import '@/pages/Register/validate';

new Vue({
  render: h => h(App),
  // 全局事件总线$bus配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  // 注册仓库：组件实例的身上会多一个￥store属性
  store
}).$mount('#app')

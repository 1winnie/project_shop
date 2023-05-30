<template>
  <div>
      <Header></Header>
      <router-view></router-view>
      <!-- 在Home、search显示的，在登录、注册隐藏 -->
      <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name:'App',
  components:{Header,Footer},
  mounted(){
    // 所有的组件当中，app是最先执行的，而且mouted只会执行一次
    // 通知Vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
<template>
  <dir>
        <!-- 三级联动全局组件，三级联动已经注册为全局组件，因此不需要引入 -->
        <TypeNav/>
        <ListContainer/>
        <Recommend/>
        <like/>
        <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
        <!-- <Floor/> -->
        <Brand/>
        <router-link to="/SyncTest">dd</router-link> 
  </dir>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import like from '@/pages/Home/Like';
import Floor from '@/pages/Home/Floor';
import Brand from '@/pages/Home/Brand';
import { mapState } from 'vuex';
export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name:'Home',
    components:{ListContainer,Recommend,like,Floor,Brand},
    mounted(){
        // 派发actions
        
      this.$store.dispatch("getFloorList")
      
    },
  computed:{
      ...mapState( {
         floorList : (state) => state.home.FloorList
      })
  }
    }

</script>

<style>

</style>
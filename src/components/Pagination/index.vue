<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo==1" @click="$emit('getPageNO',pageNo -1)">上一页</button>
    <button v-if="startNumAndEndNum.start > 1"  @click="$emit('getPageNO',1)" :class="{active:pageNo ==1}">1</button>
    <!-- pageno为5以上 -->
    <button v-if="startNumAndEndNum.start > 2">···</button>
    <!-- 中间连续部分 -->
    <button v-for="(page,index) in startNumAndEndNum.end" :key="index" v-if="page>=startNumAndEndNum.start" @click="$emit('getPageNO',page)"
        :class="{active:pageNo ==page}">{{ page }}</button>
    <!-- 下 7,8,9 -->
    <button v-if="startNumAndEndNum.end < totalPage -1">···</button>
    <button v-if="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo',totalPage)"
    :class="{active:pageNo ==totalPage}">{{ totalPage }}</button>
    <button :disabled="pageNo == totalPage" @click="$emit('getPageNO',pageNo+1)">下一页</button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    // 总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    startNumAndEndNum(){
      let { pageNo, totalPage, continues } = this;
      let start = 0,
        end = 0;
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        //  不明情况 -1 0 1 2 3 ,0 1 2 3 4
        if (start < 1) {
          start = 1;
          end = continues;
        }
        //28 29 30 31 32,29 30 31 32 33,
        if (end > totalPage) {
          start = totalPage - continues +1 ;//16
          end = totalPage;//20
         
        }
      }
      return {start, end}
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: pink !important;
}
</style>
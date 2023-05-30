<template>
  <div>
    小明爸爸现在还有{{money}}元

    <Child :money="money" @update:money="money = $event" />
  </div>
</template>

<script>
import Child from "@/pages/Child";
export default {
  name: "SyncTest",
  data() {
    return {
      money: 10000,
    }
  },
  components: {
    Child,
  },
};
</script>

<style>
</style>
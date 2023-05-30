<template>
  <div>
    <button @click="$emit('update:money',money - 100)">花钱</button>
  爸爸还剩{{ money }}元
  </div>
</template>

<script>
export default {
    name:'Child',
    props:['money']
}
</script>

<style>

</style>
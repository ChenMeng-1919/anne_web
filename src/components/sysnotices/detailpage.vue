<template>
  <div>
    <h2>公告标题</h2>
    <h3>这里是公告标题</h3>
    <h2>公告内容</h2>
    <div v-html="message"></div>
  </div>
</template>

<script>
export default {
  name: "detailpage",
  data() {
    return {
      message: '<h3>这里是公告内容</h3>'
    }
  }
}
</script>

<style scoped>

</style>

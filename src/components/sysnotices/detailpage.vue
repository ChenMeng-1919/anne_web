<template>
  <div>
    <h2>公告标题</h2>
    <h3>{{ sysNotices.noticesTitle }}</h3>
    <h2>公告内容</h2>
    <div v-html="sysNotices.contentValue"></div>
  </div>
</template>

<script>
import http from "../../utils/request";

export default {
  name: "detailpage",
  data() {
    return {
      id: '',
      sysNotices: {
        noticesTitle: '',
        contentValue: ''
      }

    }
  },
  created() {
    this.id = this.$route.params.id;
    http.get('system/notices/getcontent.html', this.id).then((res) => {
      this.sysNotices = res;
    })
  }
}
</script>

<style scoped>

</style>

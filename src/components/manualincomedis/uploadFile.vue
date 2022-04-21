<template>
  <div style="float: left; width: 100%;">
    <div id="mainPage">
      <el-upload
        class="upload-demo"
        drag
        :action="totalPrice"
        :on-success="returnPage"
        style="width: 360px;">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <div id="retrunbutton">
        <el-button size="small" type="primary" @click="returnPage">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "uploadFile",
  data() {
    return {
      formDataurl: '/ANNE_NEW/incomedis/import.html?headRowId=',
      headRowIdRou: '',
    };
  },
  methods: {
    returnPage() {

      this.$router.push({
        name: 'incomedisDetails',
        params: {
          headRowId: this.headRowIdRou
        }
      });
    },
  },
  computed: { //用来书写计算相关方法  计算属性
    totalPrice() {  //计算方法  好处:只进行一次计算,多次使用时直接使用第一次计算之后缓存结果
      return this.formDataurl + this.headRowIdRou;
    }
  },
  created() {
    //console.log(this.$route.params);
    //console.log(this.$route.query);
    this.headRowIdRou = this.$route.params.headRowId;
    this.formDataurl
    console.log(this.formDataurl)
  }
}
</script>

<style scoped>

</style>

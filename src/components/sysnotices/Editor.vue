<template>
  <div style="float: left; width: 100%">
    <el-form :inline="true" ref="form" :model="sysNotices" label-width="100px">
      <el-form-item label="公告标题：">
        <el-input style="width: 800px" v-model="sysNotices.noticesTitle"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="bottonwidth" @click="submitData">提交</el-button>
        <el-button @click="returnPage">返回</el-button>
      </el-form-item>
      <Editor
        v-model="sysNotices.contentValue"
        :init="init"
        :disabled="disabled"
        :placeholder="placeholder"
        @onClick="onClick"
      />
    </el-form>
  </div>
</template>

<script>
import http from "../../utils/request";
import Editor from "@tinymce/tinymce-vue";
import tinymce from "tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default";

// 引入编辑器插件
import "tinymce/plugins/code"; //编辑源码
import "tinymce/plugins/image"; //插入编辑图片
import "tinymce/plugins/link"; //超链接
import "tinymce/plugins/preview"; //预览
import "tinymce/plugins/table"; //表格

export default {
  components: {
    Editor,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    height: {
      type: Number,
      default: 300,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default: "link preview table",
    },
    toolbar: {
      type: [String, Array],
      default:
        "undo redo |  forecolor backcolor bold italic underline strikethrough link | formatselect fontselect fontsizeselect | \
					alignleft aligncenter alignright alignjustify outdent indent lineheight | bullist numlist | \
					image table  preview | code selectall",
    },
  },
  data() {
    return {
      sysNotices: {
        noticesTitle: "",
        contentValue: this.modelValue,
      },
      init: {
        //language_url: "/static/tinymce/langs/zh_CN.js",
        language_url: "/ANNE_NEW/vueandele/sysnotices/tinymce/langs/zh_CN.js",
        language: "zh_CN",
        //skin_url: "/static/tinymce/skins/ui/oxide",
        skin_url: "/ANNE_NEW/vueandele/sysnotices/tinymce/skins/ui/oxide",
        menubar: false,
        height: 500,
        min_height: 770,
        max_height: 770,
        toolbar_mode: "wrap",
        plugins: this.plugins,
        toolbar: this.toolbar,
        content_style: "p {margin: 5px 0;}",
        fontsize_formats: "12px 14px 16px 18px 24px 36px 48px 56px 72px",
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;",
        branding: false,
        images_upload_handler: (blobInfo, success, failure) => {
          const img = "data:image/jpeg;base64," + blobInfo.base64();
          success(img);
        },
      },
    };
  },
  watch: {
    modelValue(val) {
      this.sysNotices.contentValue = val;
    },
    contentValue(val) {
      this.$emit("update:modelValue", val);
    },
  },
  mounted() {
    tinymce.init({});
  },
  methods: {
    onClick(e) {
      this.$emit("onClick", e, tinymce);
    },
    submitData() {
      http.post('system/notices/save.html', this.sysNotices).then(() => {
        this.$router.push({
          name: "mainpage",
        });
      }).catch(() => {
        console.log("富文本保存异常")
      });
    },
    returnPage() {
      this.$router.push({
        name: "mainpage",
      });
    },
  },
};
</script>

<style scoped>
.bottonwidth {
  margin: 0 20px;
}
</style>

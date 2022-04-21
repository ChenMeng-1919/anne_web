<template>
  <div>
    <el-row>
      <el-col :offset="10">
        <h1 style="color: #3a8ee6">管会月结数据核对</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="10">
        <div style="width: 100%;">
          <el-select v-model="selectValue" filterable placeholder="请选择" clearable>
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="10">
        <el-upload
          class="upload-demo"
          :action="selectValue"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList"
          mul
          :on-success="successdo"
          style="width: 100%;">
          <el-button size="small" type="primary" style=" margin-top: 20px">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">上传excel数据源</div>
        </el-upload>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "monthlycheckout",
  data() {
    return {
      options: [{
        value: '/uploadCheckOrg',
        label: '机构核对'
      }, {
        value: '/uploadcheckCBZX',
        label: '成本中心核对'
      }, {
        value: '/uploadcheckCBZXSX',
        label: '成本中心属性核对'
      }, {
        value: '/checkAccount',
        label: '新科目核对'
      }, {
        value: '/filterAccount',
        label: '新科目核对结果过滤'
      }, {
        value: '/addAccount',
        label: '新增科目核对'
      }, {
        value: '/addProd',
        label: '新增产品核对'
      }, {
        value: '/mtobCheck',
        label: '总分核对'
      }, {
        value: '/uploadcheckAccountProductMapping',
        label: '科目产品映射'
      }, {
        value: '/uploadcheckAccountLobMapping',
        label: '科目条线映射'
      }, {
        value: '/uploadcheckCBZXSX',
        label: '源系统产品映射'
      }, {
        value: '/uploadcheckCBZXSX',
        label: '源系统条线映射'
      }, {
        value: '/orgChange',
        label: '机构变更'
      }],
      selectValue: '',
      fileList: [],
      fileUUID: ''
    }

  },
  methods: {

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    successdo(response, file, fileList) {
      this.fileUUID = response;
      console.log(this.fileUUID)

      axios({
        method: "get",
        url: "http://localhost:8080/getFileById",
        params: {
          fileUUID: this.fileUUID
        },
        /*data: this.fileUUID,*/
        responseType: 'blob'
      }).then(res => {
        const fileName = res.headers['content-disposition'].match(
          /filename=(.*)/
        )[1]
        console.log(res)
        console.log(res.headers)
        var blob = new Blob([res.data], {type: "application/octet-stream"});
        if (window.navigator.msSaveOrOpenBlob) {//msSaveOrOpenBlob方法返回bool值
          navigator.msSaveBlob(blob, decodeURI(fileName));//本地保存
        } else {
          var link = document.createElement('a');//a标签下载
          link.href = window.URL.createObjectURL(blob);
          link.download = decodeURI(fileName);
          link.click();
          window.URL.revokeObjectURL(link.href);
        }
      });
    }
  },
}
</script>

<style scoped>

</style>

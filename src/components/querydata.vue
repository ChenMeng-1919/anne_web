<template>
  <div>
    <el-form :model="formInline">
      <el-form-item>
        <el-row>
          <el-col :span="16" :offset="4">
            <el-input
              type="textarea"
              :autosize="{ minRows: 6}"
              placeholder="请输入需要查询的sql"
              v-model="formInline.sqlstring"
              :clearable="true"
              ref="inputs">
            </el-input>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
        <el-row>
          <el-col :offset="17">
            <el-button type="primary" @click="onSubmit" :loading="queryState">查询</el-button>
            <el-button type="primary" @click="clears">清空</el-button>
            <el-button type="primary" @click="download">下载</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>

    <el-table
      :data="tableData"
      height="450"
      border
      style="width: 100%"
      ref="singleTable"
      highlight-current-row
    >
      <!--            @current-change="handleCurrentChange"-->
      <template v-if="tableData.length > 0">
        <el-table-column v-for="(item,key) in tableData[0]"
                         :prop='key'
                         :label='key'>
        </el-table-column>
      </template>

    </el-table>
  </div>
</template>

<script>
export default {
  name: "querydata",
  data() {
    return {
      queryState: false,
      formInline: {
        sqlstring: '',
      },
      tableData: [],
      search: ''
    }
  },
  methods: {
    clears() {
      this.$refs.inputs.clear();
    },
    onSubmit() {
      this.queryState = true;
      //发送登录请求
      axios.post("http://localhost:8080/querydata", this.formInline).then(res => {
        this.queryState = false;
        this.tableData = res.data.data;
      }).catch(res => {
        if (res.response.data.code == 500) {
          alert("服务端错误,请检查sql语句."+res.response.data.message)
          this.queryState = false;
        }
      });

    },
    download() {
      this.queryState = true;
      axios({
        method: "get",
        url: "http://localhost:8080/downquerydata",
        params: {
          sqlstring: this.formInline.sqlstring
        },
        /*data: this.fileUUID,*/
        responseType: 'blob'
      }).then(res => {
        const fileName = res.headers['content-disposition'].match(
          /filename=(.*)/
        )[1]
        this.queryState = false;
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
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
}
</script>

<style scoped>

</style>

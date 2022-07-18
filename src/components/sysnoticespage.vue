<template>
  <div>
    <el-form :inline="true" :model="prodTraceForminLine" class="demo-form-inline">
      <el-form-item label="期间">
        <el-date-picker type="month" placeholder="选择期间" v-model="prodTraceForminLine.asOfDate"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM-dd"
                        style="width: 200px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="机构">
        <el-select
          v-model="prodTraceForminLine.orgId"
          placeholder="输入编码或名称"
          clearable
          :loading="orgIdloading"
          filterable
          remote
          reserve-keyword
          :remote-method="queryOrg"
          style="width: 200px;">
          <el-option
            v-for="item in orgOptions"
            :key="item.code"
            :label="'['+item.code+']'+item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="条线">
        <el-select
          v-model="prodTraceForminLine.lobId"
          placeholder="条线"
          clearable
          :loading="lobIdloading"
          filterable
          style="width: 200px;">
          <el-option
            v-for="item in lobOptions"
            :key="item.code"
            :label="'['+item.code+']'+item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="产品">
        <el-select
          v-model="prodTraceForminLine.prodId"
          placeholder="产品"
          clearable
          :loading="prodIdloading"
          filterable
          style="width: 200px;">
          <el-option
            v-for="item in prodOptions"
            :key="item.code"
            :label="'['+item.code+']'+item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getPage">查询</el-button>
      </el-form-item>
    </el-form>
    <el-container>
      <el-header height="40px" text-align: right>
        <el-row :gutter="0">
          <el-col :span="2">
            <font color="#FFFFFF">系统公告</font>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="newNotices">新建公告</el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="viewDetails">查看明细
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          v-loading="loading"
          ref="singleTable"
          :data="tableData"
          border
          :fit="true"
          :row-class-name="tableRowClassName"
          @current-change="lineChange"
          highlight-current-row
          height="600"
        >
          <el-table-column
            header-align="center"
            type="index">
          </el-table-column>
          <el-table-column
            header-align="center"
            property="noticesTitle"
            label="公告标题"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            property="publisher"
            label="发布人"
          >
          </el-table-column>
          <el-table-column
            header-align="center"
            property="asOfDate"
            label="发布时间"
          >
          </el-table-column>
        </el-table>

      </el-main>
      <el-footer height="50px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="10"
          background
          prev-text="上一页"
          next-text="下一页"
          layout="total, sizes, prev, pager, next, jumper"
          :total="PageCondition.pageCount">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import tinymce from 'tinymce/tinymce' //tinymce默认hidden，不引入不显示
import Editor from '@tinymce/tinymce-vue'//编辑器引入
import 'tinymce/themes/silver/theme'//编辑器主题
import 'tinymce/plugins/link'  //超链接
import 'tinymce/plugins/paste'  //粘贴过滤
import 'tinymce/plugins/preview'  //预览

export default {
  name: "sysnoticespage",
  data() {
    return {
      lobOptions: [],
      orgOptions: [],
      prodOptions: [],
      orgIdloading: true,
      lobIdloading: true,
      prodIdloading: true,
      loading: false,
      tableData: [],

      currentPage: 1,
      currentRow: {},
      PageCondition: {
        page: 1,
        rows: 10,
        pageCount: 0,
      },
      prodTraceForminLine: {
        asOfDate: '',
        orgId: '',
        lobId: '',
        prodId: '',
      },
      loadingform: true,
      //按钮下载链接
      fileDownURL: '/ANNE_NEW/prodtrace/export.html',

    }
  },
  methods: {
    //获取单选选中的行信息
    lineChange(currentRow) {
      this.currentRow = currentRow;
    },

    tableRowClassName({row, rowIndex}) {
      if (row === this.currentRow) {
        return 'tableSelectedRowBgColor';
      }
      return '';
    },
    //分页插件pageSize改变
    handleSizeChange(pageSize) {
      if (pageSize != null) {
        this.PageCondition.rows = pageSize;
      }
      this.getPage();
    },
    //分页当前每页数据量变化
    handleCurrentChange(currentRow) {
      if (currentRow != null) {
        this.PageCondition.page = currentRow;
      }
      //重新加载页面数据
      this.getPage();
    },
    refreshData() {
      this.getPage();
    },
    getPage() {
      this.loading = true;
      axios.post('/ANNE_NEW/system/notices/data.html', this.PageCondition, {
          params: this.prodTraceForminLine,
        }
      )
        .then(res => {
          this.tableData = res.data.list;
          this.PageCondition.page = res.data.pageCurrent;
          this.PageCondition.rows = res.data.pageSize;
          this.PageCondition.pageCount = res.data.count;
          this.loading = false;
        });
    },

    //获取产品信息
    queryOrg(query) {
      if (query !== '') {
        this.orgIdloading = true;
        setTimeout(() => {
          axios.post('/ANNE_NEW/field/member/fieldMemberCombox.html?code=ORG_ID&search=' + query)
            .then(res => {
              this.orgOptions = res.data.message;
              this.orgIdloading = false;
            });

        }, 200);
      } else {
        this.orgOptions = [];
      }
    },
    //获取条线信息
    queryLob() {
      axios.post('/ANNE_NEW/field/member/fieldMemberCombox.html?code=LOB_ID&level=3')
        .then(res => {
          this.lobOptions = res.data.message;
          this.lobIdloading = false;
        });
    },
    //获取产品信息
    queryProd() {
      axios.post('/ANNE_NEW/field/member/fieldMemberCombox.html?code=PROD_ID&level=6')
        .then(res => {
          this.prodOptions = res.data.message;
          this.prodIdloading = false;
        });
    },
    newNotices() {
      this.$router.push({
        name: 'incomedisDetails',
        params: {
          headRowId: this.currentRow.rowId
        }
      })
    },
    viewDetails() {
      this.$router.push({
        name: 'incomedisDetails',
        params: {
          headRowId: this.currentRow.rowId
        }
      })
    },
  },

  computed: { //用来书写计算相关方法  计算属性
    fileDown() {  //计算方法  好处:只进行一次计算,多次使用时直接使用第一次计算之后缓存结果
      return this.fileDownURL + '?asOfDate=' + this.prodTraceForminLine.asOfDate + '&orgId=' + this.prodTraceForminLine.orgId + '&lobId=' + this.prodTraceForminLine.lobId + '&prodId=' + this.prodTraceForminLine.prodId;
    }
  },

  created() {
    //加载页面时不加载数据
    this.getPage();
    //this.queryOrg();
    //this.queryLob();
    //this.queryProd();
  }
}
</script>

<style scoped>

</style>

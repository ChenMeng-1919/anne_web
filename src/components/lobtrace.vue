<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="期间">
        <el-date-picker type="month" placeholder="选择期间" v-model="formInline.asOfDate" format="yyyy 年 MM 月"
                        value-format="yyyy-MM-dd"
                        style="width: 200px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="成本池分类">
        <el-select
          v-model="formInline.ruleCode"
          placeholder="细化成本池"
          :loading="loadingRuleCode"
          clearable
          filterable
          style="width: 200px;">
          <el-option
            v-for="item in ruleCodeOptions"
            :key="item.code"
            :label="'['+item.code+']'+item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="条线">
        <el-select
          v-model="formInline.lobId"
          filterable
          remote
          reserve-keyword
          placeholder="输入编码或名称"
          :remote-method="queryLob"
          :loading="loadingform"
          clearable
          style="width: 200px;">
          <el-option
            v-for="item in lobOptions"
            :key="item.code"
            :label="'['+item.code+']'+item.name"
            :value="item.code">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="动因">
        <el-select
          v-model="formInline.driverCode"
          placeholder="动因"
          :loading="loadingDriverCode"
          clearable
          filterable
          style="width: 200px;">
          <el-option
            v-for="item in driverCodeOptions"
            :key="item.code"
            :label="'['+item.optionsCode+']'+item.optionsName"
            :value="item.optionsCode">
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
          <el-col :span="3">
            <font color="#FFFFFF">成本分摊条线可追溯</font>
          </el-col>
          <el-col :span="1.3">
            <a :href="fileDown">
              <el-button type="primary" icon="el-icon-delete" size="mini">导出</el-button>
            </a>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table
          v-loading="loading"
          ref="singleTable"
          :data="tableData"
          border
          highlight-current-row
        >
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="asOfDate"
            label="期间"
            width="100">
          </el-table-column>
          <el-table-column
            property="ruleCodeName"
            label="成本池分类"
            width="200">
          </el-table-column>
          <el-table-column
            property="lobName"
            label="条线"
            width="100">
          </el-table-column>
          <el-table-column
            property="driverName"
            label="动因"
            width="130">
          </el-table-column>
          <el-table-column
            property="bbCostAmt"
            label="待分摊成本"
            width="120">
          </el-table-column>
          <el-table-column
            property="driverAmt"
            label="条线动因数据"
            width="120">
          </el-table-column>
          <el-table-column
            property="driverRatio"
            label="条线动因占比"
            width="110">
          </el-table-column>
          <el-table-column
            property="sumDriverAmt"
            label="动因合计"
            width="140">
          </el-table-column>
          <el-table-column
            property="driverPercentage"
            label="细类成本池占比"
            width="120">
          </el-table-column>
          <el-table-column
            property="costAmt"
            label="分摊成本"
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
export default {
  name: "lobtrace",
  data() {
    return {
      lobOptions: [],
      ruleCodeOptions: [],
      driverCodeOptions: [],
      loadingRuleCode: '',
      loadingDriverCode: '',
      loading: true,
      tableData: [],
      currentPage: 1,
      currentRow: {},
      PageCondition: {
        page: 1,
        rows: 10,
        pageCount: 0,
      },
      formInline: {
        asOfDate: '',
        ruleCode: '',
        lobId: '',
        driverCode: '',
      },
      loadingform: true,
      //按钮下载链接
      fileDownURL: '/ANNE_NEW/lobtrace/export.html',

    }
  },
  methods: {
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
      //console.log(`当前页: ${r'${val}'}`);
    },
    refreshData() {
      this.getPage();
    },
    getPage() {
      axios.post('/ANNE_NEW/lobtrace/page.html', this.PageCondition, {
          params: this.formInline,
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
    //获取条线信息
    queryLob(query) {
      if (query !== '') {
        this.loadingform = true;
        setTimeout(() => {
          axios.post('/ANNE_NEW/field/member/fieldMemberCombox.html?code=LOB_ID&level=3&search=' + query)
            .then(res => {
              this.lobOptions = res.data.message;
              this.loadingform = false;
            });

        }, 200);
      } else {
        this.lobOptions = [];
      }
    },
    //获取成本池编码
    queryRuleCode() {
      this.loadingRuleCode = true;
      axios.post('/ANNE_NEW/field/member/fieldMemberCombox.html?code=COST_POOL_DATAILS')
        .then(res => {
          this.ruleCodeOptions = res.data.message;
          //console.log(this.ruleCodeOptions);
          this.loadingRuleCode = false;
        });
    },
    //获取分摊动因
    queryDriverCode() {
      this.loadingDriverCode = true;
      axios.post('/ANNE_NEW/searchmember/bydrivercode.html')
        .then(res => {
          this.driverCodeOptions = res.data;
          //console.log(this.driverCodeOptions);
          this.loadingDriverCode = false;
        });
    },
  },
  computed: { //用来书写计算相关方法  计算属性
    fileDown() {  //计算方法  好处:只进行一次计算,多次使用时直接使用第一次计算之后缓存结果
      return this.fileDownURL + '?asOfDate=' + this.formInline.asOfDate + '&ruleCode=' + this.formInline.ruleCode + '&lobId=' + this.formInline.lobId + '&driverCode=' + this.formInline.driverCode;
    }
  },
  created() {
    this.getPage();
    this.queryRuleCode();
    this.queryDriverCode();
  }
}
</script>

<style scoped>

</style>

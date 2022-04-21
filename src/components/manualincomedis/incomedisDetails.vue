<template>
  <div>
    <el-container>
      <el-header height="40px" text-align: right>
        <el-row :gutter="0">
          <el-col :span="3">
            <font color="#FFFFFF">手工收益分配列表</font>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-folder-add" size="mini" @click="returnDetailsPage">返回
            </el-button>
          </el-col>
          <!--<el-col :span="1.3">
              <el-button type="primary" icon="el-icon-folder-add" size="mini" @click="addDetails">新增
              </el-button>
          </el-col>
          <el-col :span="1.3">
              <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
          </el-col>-->
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="refreshData">刷新</el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteData">删除</el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="uploadPage">导入</el-button>
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
          ref="singleTable"
          :data="tableData"
          border
          highlight-current-row
          @current-change="handleCurrentChange2"
          style="width: 100%">
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="asOfDate"
            label="数据日期">
          </el-table-column>
          <el-table-column
            property="bsProductCode"
            label="业务系统产品">
          </el-table-column>
          <el-table-column
            property="allocationPeriod"
            label="分配期间">
          </el-table-column>
          <el-table-column
            property="accountCode"
            label="会计科目编码">
          </el-table-column>
          <el-table-column
            property="currency"
            label="币种">
          </el-table-column>
          <el-table-column
            property="allocationType"
            label="分配类型">
          </el-table-column>
          <el-table-column
            property="summary"
            label="摘要">
          </el-table-column>
          <el-table-column
            property="disDirectionState"
            label="分配方向标识">
          </el-table-column>
          <el-table-column
            property="disOrgLev"
            label="分配机构层级">
          </el-table-column>
          <el-table-column
            property="disOrgCode"
            label="分配机构编码">
          </el-table-column>
          <el-table-column
            property="disLobCode"
            label="分配条线编码">
          </el-table-column>
          <el-table-column
            property="disProdCode"
            label="分配产品编码">
          </el-table-column>
          <el-table-column
            property="disIndicator"
            label="分配指标">
          </el-table-column>
          <el-table-column
            property="disAmount"
            label="分配金额">
          </el-table-column>
          <el-table-column
            property="disScale"
            label="分配规模（虚拟）">
          </el-table-column>
          <el-table-column
            property="initiatingDepartment"
            label="发起部门">
          </el-table-column>
          <el-table-column
            property="processState"
            label="流程标识">
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
  name: "incomedisDetails",
  data() {
    return {
      fileDownLoadurl: '/ANNE_NEW/incomedis/export.html?headRowId=',
      tableData: [],
      currentPage: 1,
      currentRow: {},
      headRowIdRou: '',
      PageCondition: {
        page: 1,
        rows: 10,
        pageCount: 0,
      }
    }
  },
  methods: {
    returnDetailsPage() {
      this.$router.push({name: "incomedisHead"});
    },
    handleSizeChange(pageSize) {
      if (pageSize != null) {
        this.PageCondition.rows = pageSize;
      }
      this.getPage();
    },
    addDetails() {
      this.$router.push({name: "addDetails"});
    },
    handleCurrentChange(currentRow) {
      if (currentRow != null) {
        this.PageCondition.page = currentRow;
      }
      this.getPage();
    },
    handleCurrentChange2(currentRow) {
      if (currentRow != null) {
        this.currentRow = currentRow;
      }
    },
    refreshData() {
      //console.log(this.$route.query.rowId);
      this.getPage(this.headRowIdRou);
    },
    deleteData() {
      if (this.currentRow.rowId == null) {
        this.$message({
          message: '请选择要删除的数据',
          type: 'warning'
        });
      } else {
        this.$alert("确认要删除此条数据？", "消息提示", {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              axios.get('/ANNE_NEW/incomedis/delete.html?rowId=' + this.currentRow.rowId)
                .then(res => {
                  this.getPage(this.headRowIdRou);
                });
            }
          }
        });
      }
    },
    getPage(headRowId) {
      axios.post('/ANNE_NEW/incomedis/page.html?headRowId=' + headRowId, this.PageCondition)
        .then(res => {
          this.tableData = res.data.list;
          this.PageCondition.page = res.data.pageCurrent;
          this.PageCondition.rows = res.data.pageSize;
          this.PageCondition.pageCount = res.data.count;
        });
    },
    uploadPage() {
      /*this.$router.push({
          name: 'uploadFile',
          query: {
              headRowId: this.$route.query.rowId
          }
      });*/
      this.$router.push({
        name: 'uploadFile',
        params: {
          headRowId: this.headRowIdRou
        }
      });
    },
  },
  computed: { //用来书写计算相关方法  计算属性
    fileDown() {  //计算方法  好处:只进行一次计算,多次使用时直接使用第一次计算之后缓存结果
      return this.fileDownLoadurl + this.headRowIdRou;
    }
  },
  created() {
    this.headRowIdRou = this.$route.params.headRowId;
    this.getPage(this.headRowIdRou);
  }
}
</script>

<style scoped>

</style>

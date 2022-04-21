<template>
  <div>
    <el-container>
      <el-header height="40px" text-align: right>
        <el-row :gutter="0">
          <el-col :span="3">
            <font color="#FFFFFF">手工收益分配列表</font>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-folder-add" size="mini" @click="addDetails">新增
            </el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDetails">修改</el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-refresh" size="mini" @click="refreshData">刷新</el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="deleteData">删除</el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="editDetail">编辑明细</el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="subForApproval">提交审批
            </el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="approve">通过</el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="withdraw">撤回</el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button type="primary" icon="el-icon-delete" size="mini" @click="sendBack">退回</el-button>
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
          @current-change="handleCurrentChange2"
        >
          <el-table-column
            type="index"
            width="50">
          </el-table-column>
          <el-table-column
            property="asOfDate"
            label="数据日期"
            width="80">
          </el-table-column>
          <el-table-column
            property="orgId"
            label="机构"
            width="400">
          </el-table-column>
          <el-table-column
            property="statusName"
            label="状态"
            width="80">
          </el-table-column>
          <el-table-column
            property="createBy"
            label="录入人"
            width="150">
          </el-table-column>
          <el-table-column
            property="approvedBy"
            label="审核人"
            width="150">
          </el-table-column>
          <el-table-column
            property="description"
            label="摘要"
            width="200">
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
  name: "incomedisHead",
  data() {
    return {
      loading: true,
      tableData: [],
      currentPage: 1,
      currentRow: {},
      PageCondition: {
        page: 1,
        rows: 10,
        pageCount: 0,
      }
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
    //修改
    editDetails() {
      if (this.currentRow.rowId == null) {
        this.$message({
          message: '请选择要修改的数据',
          type: 'warning'
        });
      } else if (this.currentRow.statusName === "通过") {
        this.$message({
          message: '通过状态的数据不允许修改',
          type: 'warning'
        });
      } else {
        this.$router.push({
          name: 'addIncomedisHead',
          /*query: {
              rowId: this.currentRow.rowId,
          }*/
          query: this.currentRow
        })
      }
    },
    addDetails() {
      this.$router.push({name: "addIncomedisHead"});
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
    //获取单选选中的行信息
    handleCurrentChange2(currentRow) {
      if (currentRow != null) {
        this.currentRow = currentRow;
      }
    },
    refreshData() {
      this.getPage();
    },
    deleteData() {
      if (this.currentRow.rowId == null) {
        this.$message({
          message: '请选择要删除的数据',
          type: 'warning'
        });
      } else if (this.currentRow.statusName === "通过" || this.currentRow.statusName === "待审") {
        this.$message({
          message: '待审状态的数据不允许删除',
          type: 'warning'
        });
      } else {
        this.$alert("确认要删除此条数据？", "消息提示", {
          confirmButtonText: '确定',
          callback: action => {
            if (action === 'confirm') {
              axios.get('/ANNE_NEW/incomedisDetails/delete.html?rowId=' + this.currentRow.rowId)
                .then(res => {
                  this.getPage();
                });
            }
          }
        });
      }
    },
    getPage() {
      axios.post('/ANNE_NEW/incomedisDetails/page.html', this.PageCondition)
        .then(res => {
          this.tableData = res.data.list;
          this.PageCondition.page = res.data.pageCurrent;
          this.PageCondition.rows = res.data.pageSize;
          this.PageCondition.pageCount = res.data.count;
          this.loading = false;
        });
    },
    //编辑明细
    editDetail() {
      this.$router.push({
        name: 'incomedisDetails',
        params: {
          headRowId: this.currentRow.rowId
        }
      })
    },
    open(message) {
      this.$alert(message, "消息提示", {
        confirmButtonText: '确定',
        /*callback: action => {
            this.$message({
                type: 'info',
                message: `action: ${r'${action}'}`
            });
        }*/
      });
    },
    //提交审批
    subForApproval() {
      this.$alert("确认要提交审批？", "消息提示", {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/ANNE_NEW/incomedisDetails/subForApproval.html', this.currentRow)
              .then(res => {
                if (res.data.resultstatus === 'fail') {
                  this.open(res.data.message);
                } else {
                  this.getPage();
                }
              });
          }
        }
      });
    },
    //提交审批
    approve() {
      this.$alert("确认要通过审批？", "消息提示", {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/ANNE_NEW/incomedisDetails/approve.html', this.currentRow)
              .then(res => {
                if (res.data.resultstatus === 'fail') {
                  this.open(res.data.message);
                } else {
                  this.getPage();
                }
              });
          }
        }
      });
    },
    //审批撤回
    withdraw() {
      this.$alert("确认要撤回吗？", "消息提示", {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/ANNE_NEW/incomedisDetails/withdraw.html', this.currentRow)
              .then(res => {
                if (res.data.resultstatus === 'fail') {
                  this.open(res.data.message);
                } else {
                  this.getPage();
                }
              });
          }
        }
      });
    },
    //审批回退
    sendBack() {
      this.$alert("确认要回退吗？", "消息提示", {
        confirmButtonText: '确定',
        callback: action => {
          if (action === 'confirm') {
            axios.post('/ANNE_NEW/incomedisDetails/sendBack.html', this.currentRow)
              .then(res => {
                if (res.data.resultstatus === 'fail') {
                  this.open(res.data.message);
                } else {
                  this.getPage();
                }
              });
          }
        }
      });
    },
  },
  created() {
    this.getPage();
  }
}
</script>

<style scoped>

</style>

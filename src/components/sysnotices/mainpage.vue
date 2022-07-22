<template>
  <div>
    <el-form :inline="true" :model="searchLine" class="demo-form-inline">
      <el-form-item label="期间">
        <el-date-picker type="month" placeholder="选择期间" v-model="searchLine.asOfDate"
                        format="yyyy 年 MM 月"
                        value-format="yyyy-MM-dd"
                        style="width: 200px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="公告标题">
        <el-input v-model="searchLine.noticesTitle" placeholder="输入公告标题搜索"></el-input>
      </el-form-item>
      <el-form-item label="发布人">
        <el-input v-model="searchLine.publisher" placeholder="输入发布人搜索"></el-input>
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
            <el-button class="el-button" type="primary" icon="el-icon-folder-add" size="mini" @click="newNotices">新建公告
            </el-button>
          </el-col>
          <el-col :span="1.3">
            <el-button class="el-button" type="primary" icon="el-icon-link" size="mini" @click="viewDetails">查看明细
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

import http from "@/utils/request"

export default {
  name: "mainpage",
  data() {
    return {
      loading: false,
      tableData: [],
      currentPage: 1,
      currentRow: {},
      PageCondition: {
        page: 1,
        rows: 10,
        pageCount: 0,
      },
      searchLine: {
        asOfDate: '',
        noticesTitle: '',
        publisher: '',
      },
      loadingform: true,

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
      http.post('system/notices/data.html', this.PageCondition, {
        params: this.searchLine,
      }).then(res => {
        this.tableData = res.data.list;
        this.PageCondition.page = res.data.pageCurrent;
        this.PageCondition.rows = res.data.pageSize;
        this.PageCondition.pageCount = res.data.count;
        this.loading = false;
      });
    },

    newNotices() {
      this.$router.push({
        name: 'Editor',
      })
    },

    viewDetails() {
      this.$router.push({
        name: 'detailpage',
        params: {
          id: this.currentRow.id
        }
      })
    },
  },

  created() {
    //加载页面时不加载数据
    this.getPage();
  }
}
</script>

<style scoped>

.el-button {
  margin: 0 4px;
}

.el-header {
  background-color: #307ECC;
  color: #333;
  text-align: center;
  height: 40px;
  line-height: 40px;
}


.el-footer {
  background-color: #EFF3F8;
  color: #333;
  text-align: center;
  line-height: 50px;
}

.el-button {
  background: #6FB3E0;
}

.tableSelectedRowBgColor td {
  background-color: #69A8EA !important;
  color: #fff;
}
</style>

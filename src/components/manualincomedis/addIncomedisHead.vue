<template>
  <div style="float: left; width: 100%;">
    <el-form v-loading="loading2" :model="form" :rules="rules" ref="ruleForm" label-position="left"
             label-width="80px">
      <el-form-item label="数据日期" prop="asOfDate">
        <el-date-picker type="month" placeholder="选择日期" v-model="form.asOfDate" format="yyyy 年 MM 月"
                        value-format="yyyy-MM-dd"
                        style="width: 250px;"></el-date-picker>
      </el-form-item>
      <el-form-item label="机构" prop="orgId">
        <el-select
          v-model="form.orgId"
          filterable
          remote
          reserve-keyword
          placeholder="请输入机构号或机构名称进行搜索"
          :remote-method="remoteMethod"
          :loading="loading"
          clearable
          style="width: 250px;">
          <el-option
            v-for="item in options"
            :key="item.code"
            :label="item.code+item.name"
            :value="item.code+item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="摘要" prop="description" style="width: 600px;">
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
        <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
        <el-button type="primary" @click="returnDetailsPage">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addIncomedisHead",
  data() {
    return {
      options: [],
      loading: true,
      loading2: true,
      form: {
        asOfDate: '',
        orgId: '',
        description: ''
      },
      rules: {
        asOfDate: [
          {type: 'string', required: true, message: '请选择日期', trigger: 'change'}
        ],
        orgId: [
          {required: true, message: '请选择机构', trigger: 'change'}
        ],
        description: [
          {required: true, message: '请填写摘要', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //提交表单
    onSubmit() {
      if (this.form.rowId) {
        axios.post('/ANNE_NEW/incomedisDetails/update.html', this.form)
          .then(res => {
            this.$router.push({name: "incomedisHead"});
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        axios.post('/ANNE_NEW/incomedisDetails/save.html', this.form
        )
          .then(res => {
            console.log("成功返回");
            this.$router.push({name: "incomedisHead"});
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    //重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    //返回
    returnDetailsPage() {
      this.$router.push({name: "incomedisHead"});
    },
    //获取下拉框数据
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        setTimeout(() => {
          axios.post('/ANNE_NEW/field/member/fieldMemberCombox.html?code=ORG_ID&level=1,2,3,4,5&search=' + query)
            .then(res => {
              this.options = res.data.message;
              this.loading = false;
            });

        }, 200);
      } else {
        this.options = [];
      }
    },

  },
  created() {
    /*console.log(this.$route.params);
    console.log(this.$route.query);*/
    //判断是否是通过修改按钮进入页面
    if (this.$route.query.rowId) {
      axios.get('/ANNE_NEW/incomedisDetails/getHead.html?rowId=' + this.$route.query.rowId)
        .then(res => {
          this.form = res.data;
          this.loading2 = false;
        });
    } else {
      this.loading2 = false;
    }
  }
}
</script>

<style scoped>

</style>

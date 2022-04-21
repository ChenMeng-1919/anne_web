<template>
  <div style="float: left; width: 100%;">
    <el-form :model="form" :rules="form" ref="ruleForm" label-position="left">
      <el-form-item label="数据日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.asOfDate"
                        style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="业务系统编码" style="width: 50%;">
        <el-input v-model="form.bsProductCode"></el-input>
      </el-form-item>
      <el-form-item label="会计科目编码" style="width: 50%;">
        <el-input v-model="form.accountCode"></el-input>
      </el-form-item>
      <el-form-item label="币种">
        <el-radio-group v-model="form.currency">
          <el-radio label="人民币"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分配类型">
        <el-radio-group v-model="form.allocationType">
          <el-radio label="收入分配"></el-radio>
          <el-radio label="差错更正"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="摘要">
        <el-input type="textarea" v-model="form.summary"></el-input>
      </el-form-item>
      <el-form-item label="分配方向">
        <el-radio-group v-model="form.disDirectionState">
          <el-radio label="分入方"></el-radio>
          <el-radio label="分出方"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="分配机构层级">
        <el-select v-model="form.disOrgLev" placeholder="分配机构层级">
          <el-option label="总行" value="shanghai"></el-option>
          <el-option label="一级分行" value="beijing"></el-option>
          <el-option label="二级分行" value="beijing"></el-option>
          <el-option label="一级支行" value="beijing"></el-option>
          <el-option label="二级支行" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分配机构编码" style="width: 50%;">
        <el-input v-model="form.disOrgCode"></el-input>
      </el-form-item>
      <el-form-item label="分配条线编码" style="width: 50%;">
        <el-input v-model="form.disLobCode"></el-input>
      </el-form-item>
      <el-form-item label="分配产品编码" style="width: 50%;">
        <el-input v-model="form.disProdCode"></el-input>
      </el-form-item>
      <el-form-item label="分配指标" style="width: 50%;">
        <el-input v-model="form.disIndicator"></el-input>
      </el-form-item>
      <el-form-item label="分配金额" style="width: 50%;">
        <el-input v-model="form.disAmount"></el-input>
      </el-form-item>
      <el-form-item label="分配规模（虚拟）" style="width: 50%;">
        <el-input v-model="form.disScale"></el-input>
      </el-form-item>
      <el-form-item label="发起部门" style="width: 50%;">
        <el-input v-model="form.initiatingDepartment"></el-input>
      </el-form-item>
      <el-form-item label="流程标识" style="width: 50%;">
        <el-input v-model="form.processState"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button type="primary">重置</el-button>
        <el-button>返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "addDetails",
  data() {
    return {
      form: {
        asOfDate: '',
        bsProductCode: '',
        allocationPeriod: '',
        accountCode: '',
        currency: '',
        allocationType: '',
        summary: '',
        disDirectionState: '',
        disOrgLev: '',
        disOrgCode: '',
        disLobState: '',
        disLobCode: '',
        disProdState: '',
        disProdCode: '',
        disIndicator: '',
        disAmount: '',
        disScale: ''
      }
    }
  },
  methods: {
    onSubmit() {
      axios.post('/ANNE_NEW/incomedis/save.html', this.form
      )
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    returnDetailsPage() {
      this.$router.push({name: "incomedisDetails"});
    }
  },
}
</script>

<style scoped>

</style>

<template>
  <el-dialog
    title="更新固件"
    :visible.sync="dialogVisible"
    width="35%"
  >
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="固件名称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="固件上传">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
      <el-form-item label="固件详情">
        <el-input v-model="ruleForm.detail" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
export default {
  name: 'UpdateDevice',

  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: '',
        fileUrl: '',
        detail: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入固件名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    isShow(visible) {
      this.dialogVisible = visible
    }
  }
}
</script>

<style scoped>

</style>

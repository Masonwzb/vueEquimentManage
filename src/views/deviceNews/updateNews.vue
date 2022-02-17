<template>
  <el-dialog
    title="更新新闻"
    :visible.sync="dialogVisible"
    width="50"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="新闻标题" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item>
        <tinymce ref="newsTinymce" v-model="ruleForm.content" :height="300" />
      </el-form-item>
      <el-form-item>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import Tinymce from '@/components/Tinymce'

export default {
  name: 'UpdateNews',

  components: {
    Tinymce
  },

  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        name: '',
        content: ''
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

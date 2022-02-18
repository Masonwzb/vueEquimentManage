<template>
  <el-dialog
    :title="isEdit ? '更新新闻内容' : '新增新闻内容'"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="新闻标题" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item>
        <tinymce ref="newsTinymce" v-model="ruleForm.detail" :height="300" />
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
import { addNews, updateNews } from '@/api/deviceNews'

export default {
  name: 'UpdateNews',

  components: {
    Tinymce
  },

  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        title: '',
        detail: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入新闻标题', trigger: 'blur' }
        ]
      },
      isEdit: false,
      editContent: null
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          let res
          const { title, detail } = this.ruleForm
          if (!this.isEdit) {
            res = await addNews({
              title,
              detail
            })
          } else {
            res = await updateNews({
              id: this.editContent.id,
              title,
              detail
            })
          }

          if (res) {
            this.$message({
              message: '保存成功',
              type: 'error'
            })
            this.$emit('newsUpdated')
          } else {
            this.$message({
              message: '保存失败',
              type: 'error'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    isShow(visible, theNews) {
      this.dialogVisible = visible
      this.isEdit = !!theNews

      if (!theNews) return

      this.editContent = theNews
      const { title, detail } = this.editContent
      this.ruleForm.title = title
      this.ruleForm.detail = detail
      this.$refs.newsTinymce.setContent(detail)
    }
  }
}
</script>

<style scoped>

</style>

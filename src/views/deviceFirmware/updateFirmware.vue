<template>
  <el-dialog
    title="新增固件"
    :visible.sync="dialogVisible"
    width="35%"
  >
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item label="固件名称" prop="title">
        <el-input v-model="ruleForm.title" />
      </el-form-item>
      <el-form-item label="固件上传">
        <el-upload
          class="upload-demo"
          drag
          :limit="1"
          :http-request="uploadFirmware"
        >
          <i class="el-icon-upload" />
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
import { fileUpload } from '@/api/file'
import { addFirmware } from '@/api/deviceFirmware'

export default {
  name: 'UpdateDevice',

  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        title: '',
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
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          const { title, detail, fileUrl } = this.ruleForm
          let params = { title, detail }
          fileUrl && (params = { ...params, fileUrl })
          const res = await addFirmware(params)

          if (res?.data) {
            this.$message({
              message: '保存成功',
              type: 'error'
            })
            this.$emit('firmwaresUpdated')
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
    isShow(visible) {
      this.dialogVisible = visible
    },
    async uploadFirmware(fileData) {
      const { file } = fileData
      console.log('自定义上传 ？？？ ', file, file.name)
      if (!file) return

      const formData = new window.FormData()
      formData.append('file', file)
      formData.append('fileType', 'driver')
      const res = await fileUpload(formData)
      if (res?.data) {
        this.ruleForm.fileUrl = res.data
        console.log('固件上传成功 ？ ', res)
      }
    }
  }
}
</script>

<style scoped>

</style>

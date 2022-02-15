<!--
 * @Description: 发布视频弹窗
 * @FilePath: /vue-equipment-manage/src/views/tutorialVideo/components/add-video.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-15 20:47:09
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-15 22:55:31
-->
<template>
  <el-dialog
    title="发布教程视频"
    :visible.sync="visible"
    width="60%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="formRules" label-width="140px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="视频上传：" prop="url">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
          :file-list="fileList"
          :on-change="handleVideoChange"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'AddVideo',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        title: '',
        content: ''
      },
      formRules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }]
      },
      fileList: []
    }
  },
  mounted() {

  },
  methods: {
    /**
     * @description: 关闭弹窗
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    handleClose() {
      this.$refs.form.resetFields()
      this.$emit('handleClose')
    },
    /**
     * @description: 发布帖子
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    handleConfirm() {
      this.handleClose()
    },
    handleVideoChange() {
      console.log(this.fileList)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>

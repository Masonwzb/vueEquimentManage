<!--
 * @Description: 发布帖子弹窗
 * @FilePath: /vue-equipment-manage/src/views/comment/components/add-comment.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-14 00:50:06
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-17 00:02:23
-->
<template>
  <el-dialog
    title="发布新帖"
    :visible.sync="visible"
    width="60%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" :rules="formRules" label-width="80px">
      <el-form-item label="标题：" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容：" prop="content">
        <tinymce ref="commentTinymce" v-model="form.content" :height="300" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleConfirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'AddComment',
  components: {
    Tinymce
  },
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
      }
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
      this.form = {
        title: '',
        content: ''
      }
      this.$refs.commentTinymce.setContent('')
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
    }
  }
}
</script>

<style lang='scss' scoped>
</style>

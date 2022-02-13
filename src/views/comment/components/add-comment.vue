<!--
 * @Description: 发布帖子弹窗
 * @FilePath: /vue-equipment-manage/src/views/comment/components/add-comment.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-14 00:50:06
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-14 01:04:17
-->
<template>
  <el-dialog
    title="发布新帖"
    :visible.sync="visible"
    width="60%"
    :before-close="handleClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题：">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="内容：">
        <tinymce v-model="content" :height="300" />
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

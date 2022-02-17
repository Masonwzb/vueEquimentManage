<template>
  <el-dialog
    title="新闻详情内容"
    :visible.sync="dialogVisible"
    width="50%"
  >
    <div class="news-content-style" v-html="content" />
  </el-dialog>
</template>

<script>
export default {
  name: 'NewDetail',
  data() {
    return {
      dialogVisible: false,
      content: '这是一段信息'
    }
  },
  methods: {
    isShow(content) {
      this.dialogVisible = true
      this.content = content
    }
  }
}
</script>

<style scoped>
.news-content-style {
  max-height: 500px;
  overflow: auto;
}
</style>

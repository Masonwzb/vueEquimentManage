<!--
 * @Description:
 * @FilePath: /vue-equipment-manage/src/App.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-13 11:54:15
 * @LastEditors: wzj
 * @LastEditTime: 2022-02-14 13:24:25
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss" scoped>
//设置表格最小高度
::v-deep .el-table__empty-block {
  min-height: 320px;
}
//表格空状态图片居中
::v-deep .el-table__body-wrapper {
  z-index: 2;
  position: static;
}
//滚动条的宽度
::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
//滚动条的滑块
::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #c9cacf;
  border-radius: 6px;
}
//隐藏富文本底部广告
::v-deep .mce-statusbar .mce-container-body {
  display: none;
}
//el-card之间间隔
::v-deep .el-card + .el-card {
  margin-top: 20px;
}
//搜索的el-card不需要下边距
::v-deep .search-card {
  .el-card__body {
    padding-bottom: 0;
  }
}
//红色文字按钮
::v-deep .btn-danger {
  color: #f56c6c;
}
//分页居右
::v-deep .page-pagination {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 16px;
}
//鼠标变成手
::v-deep .mouse-cursor {
  cursor: pointer;
}
</style>

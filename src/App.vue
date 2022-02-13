<!--
 * @Description:
 * @FilePath: /vue-equipment-manage/src/App.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-13 11:54:15
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-14 01:06:45
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
::v-deep .mce-statusbar .mce-container-body{
  display: none;
}
</style>

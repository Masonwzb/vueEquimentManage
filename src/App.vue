<!--
 * @Description:
 * @FilePath: /vue-admin-template/src/App.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-13 11:54:15
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-13 13:55:09
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
::v-deep .el-table__empty-block {
  min-height: 320px;
}
::v-deep .el-table__empty-text {
  width: 100%;
  display: block;
}
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
</style>

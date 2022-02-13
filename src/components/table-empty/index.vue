<!--
 * @Description: 公共表格空状态
 * @FilePath: /vue-admin-template/src/components/table-empty/index.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-13 13:22:00
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-13 13:41:04
-->
<template>
  <div class="table-empty">
    <span class="empty-img">
      <img src="@/assets/imgs/no_content@2x.png" alt="">
    </span>
    <span style="color: #969799" class="empty-text">暂无数据，空空如也~</span>
  </div>
</template>

<script>
export default {
  name: 'TableEmpty'
}
</script>

<style lang="scss" scoped>
.table-empty {
  width: max-content;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -36%);
  .empty-img {
    display: block;
    width: 64px;
    height: 40px;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .empty-text {
    font-size: 14px;
    font-weight: 400;
    color: #cccccc;
    line-height: 22px;
  }
}
</style>

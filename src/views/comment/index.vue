<!--
 * @Description: 论坛
 * @FilePath: /vue-equipment-manage/src/views/comment/index.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-13 12:10:58
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-14 01:10:25
-->
<template>
  <div class="page-comment">
    <!-- 查询条件 -->
    <el-form :inline="true" :model="searchForm" class="demo-form-inline">
      <el-form-item label="发帖人">
        <el-input v-model="searchForm.user" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="发布时间">
        <el-date-picker
          v-model="searchForm.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button @click="reset">重置</el-button>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 功能按钮 -->
    <div class="page-btn">
      <el-button type="primary" @click="release">发布</el-button>
    </div>
    <!-- 评论列表 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @current-change="handleCurrentChange"
    >
      <template slot="empty">
        <table-empty />
      </template>
      <el-table-column
        prop="title"
        label="标题"
        show-overflow-tooltip
        align="left"
        min-width="420"
      />
      <el-table-column prop="user" label="发布人" align="center" />
      <el-table-column prop="time" label="发布时间" align="center" />
    </el-table>
    <!-- 分页 -->
    <div class="page-pagination">
      <el-pagination
        :hide-on-single-page="total < pageObj.pageNum * pageObj.pageSize"
        :current-page="pageObj.pageNum"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handlePagination"
      />
    </div>
    <!-- 发布弹窗 -->
    <add-comment :visible="releaseVisible" @handleClose="handleReleaseClose" />
  </div>
</template>

<script>
import AddComment from './components/add-comment'
export default {
  name: 'Comment',
  components: {
    AddComment
  },
  data() {
    return {
      searchForm: {
        user: '', // 发帖人
        time: '' // 发布时间
      },
      tableData: [
        {
          title: '委屈得回去无ID户籍去武汉的激情文化基地去居委会ID家',
          user: 'sgx',
          time: '2022-01-09 14:16:15'
        }
      ], // 评论列表
      pageObj: {
        pageSize: 10,
        pageNum: 1
      },
      total: 0,
      releaseVisible: false // 是否显示发布弹窗
    }
  },
  mounted() {
    this.search()
  },
  methods: {
    /**
     * @description: 查询列表
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    search() {
      var data = {
        ...this.pageObj,
        ...this.searchForm
      }
      console.log(data)
    },
    /**
     * @description: 重置列表
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    reset() {
      this.searchForm = {
        user: '', // 发帖人
        time: '' // 发布时间
      }
      this.pageObj = {
        pageSize: 10,
        pageNum: 1
      }
      this.search()
    },
    /**
     * @description: 打开发布帖子弹窗
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    release() {
      this.releaseVisible = true
    },
    /**
     * @description: 关闭发布帖子弹窗
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    handleReleaseClose() {
      this.releaseVisible = false
    },
    /**
     * @description: 选中行,并跳转到详情页
     * @param {*} row 被选中行的数据
     * @return {*}
     * @author: sgx
     */
    handleCurrentChange(row) {
      this.$router.push({
        path: '/comment-detail',
        query: row
      })
    },
    /**
     * @description: 切换每页查询条数
     * @param {*} e
     * @return {*}
     * @author: sgx
     */
    handleSizeChange(pageSize) {
      this.pageObj.pageSize = pageSize
      this.pageObj.pageNum = 1
      this.search()
    },
    /**
     * @description: 切换页码
     * @param {*} pageNum
     * @return {*}
     * @author: sgx
     */
    handlePagination(pageNum) {
      this.pageObj.pageNum = pageNum
      this.search()
    }
  }
}
</script>

<style lang="scss" scoped>
.page-comment {
  width: 100%;
  padding: 16px 20px;
  box-sizing: border-box;

  .page-btn {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .page-pagination {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 16px;
  }
}
</style>

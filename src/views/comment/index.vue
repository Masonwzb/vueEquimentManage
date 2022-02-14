<!--
 * @Description: 论坛
 * @FilePath: /vue-equipment-manage/src/views/comment/index.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-13 12:10:58
 * @LastEditors: wzj
 * @LastEditTime: 2022-02-14 14:11:55
-->
<template>
  <div class="page-comment">
    <!-- 查询条件 -->
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="发帖人">
          <el-input v-model="searchForm.user" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="帖子标题">
          <el-input v-model="searchForm.title" placeholder="请输入" />
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
          <el-button
            icon="el-icon-refresh-right"
            @click="reset"
          >重置</el-button>
          <el-button
            type="primary"
            icon="el-icon-search"
            @click="search"
          >查询</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="release"
          >发布</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 评论列表 -->
    <div class="comment-list">
      <el-card
        v-for="(item, index) in tableData"
        :key="index"
        class="mouse-cursor"
        @click.native="handleCurrentChange(item)"
      >
        <div class="list-one">
          <div class="one-title">{{ item.title }}</div>
          <div class="one-content" v-html="item.content" />
          <div class="one-info">
            <img class="info-avatar" :src="item.avatar">
            <span
              class="info-text"
            ><span class="info-name">{{ item.user }}</span> 发布</span>
            <span class="info-time">{{ item.time }}</span>
          </div>
          <div class="one-footer">
            <div class="footer-one">
              <i class="el-icon-view footer-text" />
              <span class="footer-number">999</span>
            </div>
            <div class="footer-one">
              <i class="el-icon-thumb footer-text" />
              <span class="footer-number">699</span>
            </div>
            <div class="footer-one">
              <i class="el-icon-chat-dot-square footer-text" />
              <span class="footer-number">699</span>
            </div>
          </div>
        </div>
      </el-card>
      <!-- 加载更多 -->
      <el-card
        v-if="total > pageObj.pageNum * pageObj.pageSize"
        class="mouse-cursor"
        @click.native="handlePagination"
      >
        <div class="list-more">加载更多</div>
      </el-card>
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
        title: '', // 帖子标题
        time: '' // 发布时间
      },
      tableData: [
        {
          title: '委屈得回去无ID户籍去武汉的激情文化基地去居委会ID家',
          content:
            '<p>在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。<p>',
          user: 'sgx',
          avatar:
            'https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
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
        title: '', // 帖子标题
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
     * @description: 选中帖子,并跳转到详情页
     * @param {*} row 被选中帖子的数据
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

  .comment-list {
    width: 100%;
    margin-top: 20px;

    .list-one {
      width: 100%;
      display: flex;
      flex-direction: column;

      .one-title {
        width: 100%;
        font-size: 20px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.65);
      }

      .one-content {
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        color: #333;
      }

      .one-info {
        display: flex;
        align-items: center;

        .info-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .info-text {
          font-size: 14px;
          margin-left: 16px;
        }

        .info-name {
          font-size: 14px;
          color: #1989fa;
          margin-right: 6px;
        }

        .info-time {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.25);
          margin-left: 16px;
        }
      }

      .one-footer {
        display: flex;
        align-items: center;
        margin-top: 16px;

        .footer-one {
          .footer-text {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
          }

          .footer-number {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
            margin-left: 6px;
          }
        }

        .footer-one + .footer-one {
          padding-left: 16px;
          margin-left: 16px;
          border-left: 1px solid #e8e8e8;
        }
      }
    }

    .list-more {
      width: 100%;
      text-align: center;
      color: #1989fa;
    }
  }
}
</style>

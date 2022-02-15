<!--
 * @Description:器材视频教程
 * @FilePath: /vue-equipment-manage/src/views/tutorialVideo/index.vue
 * @Version: 0.1
 * @Autor: wzj
 * @Date: 2022-02-14 14:50:08
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-15 00:34:37
-->
<template>
  <div class="page-tutorial-video">
    <!-- 查询条件 -->
    <el-card class="search-card">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="发布人">
          <el-input v-model="searchForm.user" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="视频标题">
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
    <!-- 视频列表 -->
    <el-card class="video-list">
      <el-card
        v-for="(item, index) in tableData"
        :key="index"
        class="video-card mouse-cursor"
        @click.native="handelShowVideo(item)"
      >
        <img class="video-img" :src="item.img">
        <div class="video-title">{{ item.title }}</div>
        <div class="video-content">{{ item.content }}</div>
        <div class="video-footer">
          <div class="footer-left">
            <img class="info-avatar" :src="item.avatar">
            <span class="info-name">{{ item.user }}</span>
          </div>
          <div class="footer-right">
            <span class="video-other">{{ item.volume }}次 播放</span>
            <span class="video-time">{{ item.time }}</span>
          </div>
        </div>
      </el-card>
    </el-card>
    <!-- 播放弹窗 -->
    <video-play
      :visible="showVideo"
      :select-video="selectVideo"
      @handleClose="handleCloseVideo"
    />
  </div>
</template>

<script>
import VideoPlay from './components/video-play'
export default {
  name: 'TutorialVideo',
  components: {
    VideoPlay
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
            '在中台产品的研发过程中，会出现不同的设计规范和实现在中台产品的研发过程中，会出现不同的设计规范和实现',
          user: 'sgx',
          avatar:
            'https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
          time: '2022-01-09 14:16:15',
          volume: '999',
          img: 'https://pic.huke88.com/video/cover/2021-11-25/C059EF6D-8C11-4345-BFF0-BF349F6DF974.jpg!/fwfh/1840x1124/quality/80/unsharp/true/format/webp',
          video: 'http://vjs.zencdn.net/v/oceans.mp4'
        }
      ], // 视频列表
      showVideo: false, // 播放视频弹窗
      selectVideo: {} // 选中的视频
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
     * @description: 打开发布视频弹窗
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    release() {
      this.releaseVisible = true
    },
    /**
     * @description: 关闭发布视频弹窗
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    handleReleaseClose() {
      this.releaseVisible = false
    },
    /**
     * @description: 打开播放视频弹窗
     * @param {*} row 选中视频
     * @return {*}
     * @author: wzj
     */
    handelShowVideo(row) {
      this.selectVideo = row
      this.showVideo = true
    },
    /**
     * @description: 关闭播放视频弹窗
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    handleCloseVideo() {
      this.showVideo = false
    }
  }
}
</script>

<style lang="scss" scoped>
.page-tutorial-video {
  width: 100%;
  padding: 16px 20px;
  box-sizing: border-box;

  .video-list {
    width: 100%;

    ::v-deep .el-card__body {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      padding-left: 0;
      padding-right: 0;
      padding-bottom: 0;
    }

    .video-card {
      width: 17.6%;
      display: flex;
      flex-direction: column;
      padding-left: 20px;
      padding-right: 20px;
      padding-bottom: 20px;
      margin-bottom: 20px;
      margin-left: 2%;

      .video-img {
        width: 100%;
      }

      .video-title {
        width: 100%;
        font-size: 18px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: bold;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .video-content {
        width: 100%;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 400;
        margin-top: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .video-footer {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 10px;

        .footer-left {
          display: flex;
          align-items: center;

          .info-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
          }

          .info-name {
            font-size: 14px;
            color: #1989fa;
            margin-left: 8px;
          }
        }

        .footer-right {
          display: flex;
          align-items: flex-end;
          flex-direction: column;

          .video-other {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.25);
          }

          .video-time {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.25);
            margin-top: 6px;
          }
        }
      }
    }
    .video-card + .video-card {
      margin-top: 0;
    }
  }
}
</style>

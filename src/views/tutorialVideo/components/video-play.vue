<!--
 * @Description: 播放视频弹窗
 * @FilePath: /vue-equipment-manage/src/views/tutorialVideo/components/video-play.vue
 * @Version: 0.1
 * @Autor: wzj
 * @Date: 2022-02-14 15:42:06
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-15 20:51:34
-->
<template>
  <el-dialog
    title="视频播放"
    :visible.sync="visible"
    width="40%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :before-close="handleClose"
    @closed="showVideo = false"
  >
    <div class="video-dialog">
      <span class="video-title">{{ selectVideo.title }}</span>
      <span class="video-content">{{ selectVideo.content }}</span>
      <div class="video-info">
        <el-image
          class="info-avatar"
          :src="selectVideo.avatar"
          :preview-src-list="[selectVideo.avatar]"
        />
        <span class="info-name">{{ selectVideo.user }}</span>
        <span class="info-other-text">{{ selectVideo.time }}</span>
        <span class="info-other-text">{{ selectVideo.volume }}次 播放</span>
      </div>
      <div v-if="showVideo" class="video-main">
        <video-player
          ref="videoPlayer"
          class="video-player vjs-custom-skin"
          :playsinline="true"
          :options="playerOptions"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { videoPlayer } from 'vue-video-player'
require('video.js/dist/video-js.css')
require('vue-video-player/src/custom-theme.css')
export default {
  name: 'VideoPlay',
  components: {
    videoPlayer
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    selectVideo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      showVideo: true,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: '' // url地址
          }
        ],
        poster: '', // 你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.showVideo = true
        this.playerOptions.sources[0].src = this.selectVideo.video
        this.playerOptions.poster = this.selectVideo.img
      }
    }
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
    }
  }
}
</script>

<style lang="scss" scoped>
.video-dialog {
  width: 100%;
  display: flex;
  flex-direction: column;

  .video-title {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: bold;
  }

  .video-content {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
    margin-top: 10px;
  }

  .video-info {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;

    .info-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .info-name {
      font-size: 14px;
      color: #1989fa;
      margin-left: 10px;
    }

    .info-other-text {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.25);
      margin-left: 16px;
    }
  }

  .video-main {
    width: 100%;
  }
}
</style>

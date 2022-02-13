<!--
 * @Description: 帖子详情
 * @FilePath: /vue-admin-template/src/views/comment/detail.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-13 14:22:33
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-13 17:06:29
-->
<template>
  <div class="page-comment-detail">
    <div class="detail-left">
      <!-- 帖子内容 -->
      <div class="question-content">
        <span class="question-title">{{ queryData.title }}</span>
        <div class="user-info">
          <el-image
            class="info-avatar"
            src="https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
            :preview-src-list="[
              'https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
            ]"
          />
          <div class="info-main">
            <span class="info-name">{{ queryData.user }}</span>
            <div class="info-other">
              <span class="info-other-text">{{ queryData.time }}</span>
              <span class="info-other-text">44 浏览</span>
              <span class="info-other-text">100 点赞</span>
            </div>
          </div>
        </div>
        <div class="question-main">
          <div v-html="content" />
        </div>
      </div>
      <!-- 帖子回复 -->
      <div class="detail-reply">
        <span class="reply-title">全部回复</span>
        <div class="reply-one">
          <el-image
            class="head-avatar"
            src="https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
            :preview-src-list="[
              'https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
            ]"
          />
          <div class="one-right">
            <span class="head-user-name">小菜鸡</span>
            <div class="reply-main">
              <div v-html="content" />
            </div>
            <div class="one-footer">
              <span class="footer-other-text">{{ queryData.time }}</span>
              <i class="el-icon-thumb footer-other-text mouse-cursor" />
              <span class="footer-other-text mouse-cursor">回复</span>
            </div>
          </div>
        </div>
        <div class="reply-one">
          <el-image
            class="head-avatar"
            src="https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
            :preview-src-list="[
              'https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
            ]"
          />
          <div class="one-right">
            <span class="head-user-name">小菜鸡</span>
            <div class="reply-main">
              <div v-html="content" />
            </div>
            <div class="one-footer">
              <span class="footer-other-text">{{ queryData.time }}</span>
              <i class="el-icon-thumb footer-other-text mouse-cursor" />
              <span class="footer-other-text mouse-cursor">回复</span>
            </div>
            <div class="reply-one">
              <el-image
                class="head-avatar"
                src="https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
                :preview-src-list="[
                  'https://img1.baidu.com/it/u=1595960646,2743732364&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400',
                ]"
              />
              <div class="one-right">
                <span class="head-user-name">唐老鸭 @ 小菜鸡</span>
                <div class="reply-main">
                  <div v-html="content" />
                </div>
                <div class="one-footer">
                  <span class="footer-other-text">{{ queryData.time }}</span>
                  <i class="el-icon-thumb footer-other-text mouse-cursor" />
                  <span class="footer-other-text mouse-cursor">回复</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="components-container">
        <div>
          <tinymce v-model="content" :height="300" />
        </div>
      </div>
    </div>
    <div class="detail-right">
      <!-- 相关帖子 -->
      <div class="problem-list">
        <span class="problem-title">相关帖子</span>
        <div class="list-one mouse-cursor">
          相关帖子相关帖子相关帖子相关帖相关帖子相关帖子相关帖子相关帖子子
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'
export default {
  name: 'CommentDetail',
  components: {
    Tinymce
  },
  data() {
    return {
      queryData: {}, // 地址栏上的参数
      content: '<p>message可以包含html标签，来展示一个页面的内容。</p>' // 帖子内容
    }
  },
  created() {
    const { query } = this.$route
    this.queryData = { ...query }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-comment-detail {
  width: 100%;
  padding: 16px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .mouse-cursor {
    cursor: pointer;
  }

  .detail-left {
    width: calc(100% - 380px);

    .question-content {
      width: 100%;
      padding: 16px 20px;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 4px;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
      display: flex;
      flex-direction: column;

      .question-title {
        font-size: 24px;
        font-weight: bold;
      }

      .user-info {
        width: 100%;
        display: flex;
        align-items: center;
        margin-top: 10px;

        .info-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
        }

        .info-main {
          display: flex;
          flex-direction: column;
          margin-left: 10px;

          .info-name {
            color: #1989fa;
            padding-bottom: 6px;
          }

          .info-other {
            display: flex;
            align-items: center;

            .info-other-text {
              font-size: 14px;
              color: rgba(0, 0, 0, 0.3);
            }
            .info-other-text + .info-other-text {
              margin-left: 20px;
            }
          }
        }
      }

      .question-main {
        width: 100%;

        .main-text {
          font-size: 16px;
          font-weight: 500;
        }
      }
    }

    .detail-reply {
      width: 100%;
      padding: 16px 20px;
      box-sizing: border-box;
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 4px;
      box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
      display: flex;
      flex-direction: column;

      .reply-title {
        font-size: 20px;
        font-weight: 500;
        color: #333333;
      }
      .reply-one {
        width: 100%;
        display: flex;
        align-items: flex-start;
        margin-top: 20px;

        .head-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .one-right {
          padding-left: 16px;
          display: flex;
          flex-direction: column;

          .head-user-name {
            font-size: 14px;
            color: #1989fa;
            margin-top: 10px;
          }

          .reply-main {
            font-size: 14px;
          }
        }

        .one-footer {
          display: flex;
          align-items: center;

          .footer-other-text {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.3);
          }

          .footer-other-text + .footer-other-text {
            margin-left: 16px;
          }
        }
      }
    }
  }

  .detail-right {
    width: 360px;
    padding: 16px 20px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.1);
    display: flex;
    flex-direction: column;

    .problem-list {
      width: 100%;
      display: flex;
      flex-direction: column;

      .problem-title {
        font-size: 20px;
        font-weight: 500;
        color: #333333;
        margin-bottom: 16px;
      }

      .list-one {
        width: 100%;
        font-size: 14px;
        color: #9d9fa1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>

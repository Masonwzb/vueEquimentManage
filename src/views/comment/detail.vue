<!--
 * @Description: 帖子详情
 * @FilePath: /vue-equipment-manage/src/views/comment/detail.vue
 * @Version: 0.1
 * @Autor: sgx
 * @Date: 2022-02-13 14:22:33
 * @LastEditors: sgx
 * @LastEditTime: 2022-02-16 13:58:07
-->
<template>
  <div class="page-comment-detail">
    <div class="detail-left">
      <div class="detail-left-main">
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
          <div class="question-footer">
            <i class="el-icon-thumb footer-other-text mouse-cursor" />
            <span class="footer-other-text mouse-cursor">回复</span>
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
      </div>
      <div class="components-container">
        <el-popover placement="top" width="184" trigger="hover">
          <div class="expression-list">
            <div
              v-for="(item, index) in expressionList"
              :key="index"
              class="expression-one"
              @click="handleAddExpression(item)"
            >
              {{ item }}
            </div>
          </div>
          <el-button
            slot="reference"
            icon="el-icon-picture-outline-round"
          >表 情</el-button>
        </el-popover>
        <div class="container-content">
          <div class="content-left">
            <el-input
              id="replyTextarea"
              v-model="replyForm.content"
              type="textarea"
              placeholder="请输入内容"
              :rows="3"
              resize="none"
              maxlength="200"
              show-word-limit
            />
          </div>
          <div class="left-btn">
            <el-button type="primary" @click="replyMessage">回 复</el-button>
          </div>
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
export default {
  name: 'CommentDetail',
  components: {},
  data() {
    return {
      queryData: {}, // 地址栏上的参数
      content: '<p>message可以包含html标签，来展示一个页面的内容。</p>', // 帖子内容
      replyForm: {
        content: 'sdadasd'
      },
      blurIndex: 0,
      expressionList: [
        '😁',
        '😂',
        '😄',
        '😅',
        '😇',
        '😈',
        '😍',
        '😎',
        '😏',
        '😡',
        '😮',
        '😱'
      ]
    }
  },
  created() {
    const { query } = this.$route
    this.queryData = { ...query }
  },
  methods: {
    /**
     * @description: 添加表情
     * @param {*} expression 表情文字
     * @return {*}
     * @author: sgx
     */
    handleAddExpression(expression) {
      var textarea = document.getElementById('replyTextarea')
      var index = textarea.selectionStart // 获取光标所在位置的index
      var content = this.replyForm.content
      this.replyForm.content =
        content.slice(0, index) + expression + content.slice(index)
      this.$nextTick(() => {
        textarea.focus()
        textarea.selectionStart = index + expression.length
        textarea.selectionEnd = index + expression.length
      })
    },
    /**
     * @description: 回复
     * @param {*}
     * @return {*}
     * @author: sgx
     */
    replyMessage() {
      console.log(this.replyForm.content)
    }
  }
}
</script>

<style lang="scss" scoped>
.expression-list {
  width: 160px;
  height: 160px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  .expression-one {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
  }
}
.page-comment-detail {
  width: 100%;
  height: calc(100vh - 50px);
  padding: 16px 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .detail-left {
    width: calc(100% - 380px);
    height: 100%;
    position: relative;

    .detail-left-main {
      width: 100%;
      height: calc(100% - 150px);
      overflow-y: auto;

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

        .question-footer {
          width: 100%;
          display: flex;
          align-items: center;

          .footer-other-text {
            font-size: 16px;
            color: rgba(0, 0, 0, 0.3);
          }

          .footer-other-text + .footer-other-text {
            margin-left: 16px;
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
            margin-left: 16px;
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
  }

  .components-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 0;

    .container-content {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 10px;

      .content-left {
        width: calc(100% - 120px);
      }

      .left-btn {
        width: 100px;
        height: 75px;
        margin-left: 20px;

        ::v-deep .el-button--primary {
          width: 100%;
          height: 100%;
          font-size: 20px;
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

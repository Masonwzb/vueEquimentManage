<template>
  <div class="page-equip-infomation">
    <el-card>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input v-model="queryForm.name" placeholder="器材名称" clearable />
        </el-col>
        <el-col :span="18">
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="getList"
          >搜索</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addNewEquip"
          >新增器材信息</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        border
      >
        <template slot="empty">
          <table-empty />
        </template>
        <el-table-column prop="name" show-overflow-tooltip label="器材名称" />
        <el-table-column prop="detail" show-overflow-tooltip label="详情" />
        <el-table-column prop="imageUrl" label="器材图片" align="center">
          <template slot-scope="{ row }">
            <!-- <el-button type="text" @click="checkDetail(scope.row)">
              {{ scope.row.name }}
            </el-button> -->
            <!-- <el-image :src="require(`${scope.row.imageUrl}`)"> -->
            <div class="equip-image">
              <el-image
                class="images"
                :src="row.imageUrl"
                fit="contain"
                :preview-src-list="[row.imageUrl]"
              />
            </div>
            <!-- <div v-if="scope.row.imageUrl == ''||scope.row.imageUrl == null" class="image-slot">
            <el-tag type="info">暂无</el-tag>
            </div> -->
          </template>
        </el-table-column>
        <!-- <el-table-column prop="creatTime" label="创建时间" align="center" /> -->
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row)">
              编辑
            </el-button>
            <el-button
              type="text"
              class="btn-danger"
              @click="deleteData(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="pagination.total" class="page-pagination">
        <el-pagination
          :current-page="pagination.page"
          :page-sizes="[10, 20, 30, 50, 100]"
          :page-size="pagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <el-dialog
      :visible.sync="dialogVisible"
      :title="title"
      @closed="dialogClosed"
    >
      <el-form
        ref="postForm"
        :model="postForm"
        label-position="right"
        label-width="100px"
        :rules="postRules"
      >
        <el-form-item prop="name" label="器材名称：">
          <el-input v-model="postForm.name" placeholder="请输入器材名称" />
        </el-form-item>
        <el-form-item label="详情：" prop="detail">
          <el-input v-model="postForm.detail" placeholder="请输入详情" />
        </el-form-item>
        <el-form-item label="器材图片：" prop="imageUrl">
          <el-upload
            ref="upload"
            action
            :file-list="imgList"
            list-type="picture-card"
            :on-change="onChange"
            :show-file-list="true"
            :before-remove="handleRemove"
            :before-upload="beforeUploadImg"
            :http-request="uploadImg"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="postForm.imageUrl"
                alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in" />
                </span>
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >取消</el-button>
        <el-button
          :loading="btnIsLoading"
          type="primary"
          @click="saveData(postForm)"
        >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      tableLoading: false,
      btnIsLoading: false,
      title: '',
      imgList: [],
      dialogImageUrl: '',
      queryForm: {
        username: ''
      },
      postForm: {
        name: '',
        detail: '',
        imageUrl: ''
      },
      postRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入器材名' }]
      },
      tableData: [
        {
          name: 'bbbbjt',
          detail: 'handsomeBoy',
          imageUrl:
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202103%2F27%2F20210327215633_04df2.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1647449104&t=ded1e943ee564c0de6cf49465debcf2c'
        }
      ],
      pagination: {
        page: 1,
        size: 10,
        total: 1
      }
    }
  },
  methods: {
    checkDetail(rowData) {
      console.log(rowData)
    },
    handleSizeChange(val) {
      this.pagination.limit = val
      this.getAsStorePlaces()
    },
    handleCurrentChange(val) {
      this.pagination.page = val
      this.getAsStorePlaces()
    },
    dialogClosed() {
      this.postForm = {}
      this.imgList = []
      this.dialogVisible = false
    },
    getList() {
      console.log(33)
      this.tableLoading = true
    },
    onChange(file, fileList) {
      this.imgList = []
      if (fileList.length > 0) {
        this.imgList.push(fileList[fileList.length - 1])
        if (fileList.length > 1 && !fileList[fileList.length - 2].isNotDel) {
          this.deleteImg()
        }
      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.picVisible = true
    },
    // 删除图片
    async handleRemove(file, fileList) {
      console.log(file, fileList)
      // 移除图片
      if (!file.isNotDel) {
        this.deleteData = {
          id: this.postForm.imgUrl,
          type: 1,
          url: this.postForm.imageUrl
        }
      } else {
        this.deleteImg()
      }
      this.postForm.imgUrl = ''
      this.postForm.imageUrl = ''
      this.$refs.upload.clearFiles()
    },
    // 图片上传前的判断
    beforeUploadImg(file) {
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 10MB!')
      }
      return isLt2M
    },
    // 上传图片
    async uploadImg(item) {
      const fileObj = item.file
      const form = new FormData() // FormData 对象
      form.append('file', fileObj) // 文件对象  'file_img'是后台接收的参数名
      // const res = await uploadImg(form)
      // if (+res.data.code === 200) {
      //   this.postForm.imgUrl = res.data.data.id
      //   this.postForm.imageUrl = res.data.data.url
      // } else {
      //   this.$message.error(res.data.msg)
      // }
    },
    async deleteImg() {
      // const params = {
      //   id: this.postForm.imgUrl,
      //   type: 1,
      //   url: this.postForm.imageUrl
      // }
      // await deleteImg(params)
      // if (this.isCanDel) {
      //   this.saveModelData(this.postForm)
      // }
    },
    addNewEquip() {
      this.title = '新增器材信息'
      this.dialogVisible = true
    },
    editData(rowData) {
      console.log(rowData)
      this.title = '编辑器材信息'
      this.postForm = rowData
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.page-equip-infomation {
  width: 100%;
  padding: 16px 20px;
  box-sizing: border-box;
  .image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
    font-size: 14px;
  }
  .equip-image {
    width: 100%;
    height: 100px;
  }
  .images {
    width: 100px;
    height: 100px;
  }
}
</style>

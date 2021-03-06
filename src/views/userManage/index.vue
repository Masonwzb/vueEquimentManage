<template>
  <div class="page-user-manage">
    <el-card>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input
            v-model="queryForm.username"
            placeholder="用户名"
            clearable
          />
        </el-col>
        <el-col :span="18">
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="getList"
          >搜索</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="addNewUser">新增用户</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table
        v-loading="tableLoading"
        :data="tableData"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
      >
        <template slot="empty">
          <table-empty />
        </template>
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="trueName" label="真实姓名" align="center" />
        <el-table-column prop="phoneNumber" label="电话号码" align="center" />
        <el-table-column prop="gender" label="性别" align="center" />
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editData(scope.row)">
              编辑
            </el-button>
            <el-button type="text" class="btn-danger" @click="deleteData(scope.row)">
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
      <el-scrollbar style="height: 380px">
        <el-form
          ref="postForm"
          :model="postForm"
          label-position="right"
          label-width="100px"
          :rules="postRules"
        >
          <el-form-item prop="username" label="用户名：">
            <el-input v-model="postForm.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码：" prop="password">
            <el-input v-model="postForm.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="真实姓名：" prop="trueName">
            <el-input v-model="postForm.trueName" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="电话号码：" prop="phoneNumber">
            <el-input
              v-model="postForm.phoneNumber"
              placeholder="请输入电话号码"
            />
          </el-form-item>
          <el-form-item label="性别：" prop="gender">
            <el-select
              v-model="postForm.gender"
              style="width: 100%"
              placeholder="请选择性别"
              clearable
            >
              <el-option label="男" value="1" />
              <el-option label="女" value="2" />
            </el-select>
          </el-form-item>
          <el-form-item label="角色：" prop="roles">
            <el-select
              v-model="postForm.roles"
              style="width: 100%"
              placeholder="请选择角色"
              clearable
            >
              <el-option label="管理员" value="ADMIN" />
              <el-option label="用户" value="USER" />
            </el-select>
          </el-form-item>
          <el-form-item label="头像：" prop="avatarUrl">
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
                  :src="postForm.avatarUrl"
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
      </el-scrollbar>
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
import { getList } from '@/api/userManage'
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
        username: '',
        password: '',
        trueName: '',
        phoneNumber: '',
        avatarUrl: '',
        gender: '',
        roles: ''
      },
      postRules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入用户名' }
        ],
        password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
        roles: [{ required: true, trigger: 'blur', message: '请选择角色' }]
      },
      tableData: [
        {
          username: 'sxw',
          trueName: 'sssxw',
          gender: '女',
          phoneNumber: '1847398'
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
      this.tableLoading = true
      const param = {
        username: this.queryForm.username,
        pageNum: this.pagination.page,
        pageSize: this.pagination.size

      }
      getList(param).then(result => {
        console.log(result)
        this.tableLoading = false
      })
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
    saveData() {
      this.$refs.postForm.validate(async(valid) => {
        if (valid) {
          this.btnIsLoading = true
          const param = {
            ...this.postForm
          }
          let result
          if (this.postForm.id == null) {
            result = await addUser(param)
            console.log(result)
          } else {
            result = await updateUserById(param)
            console.log(result)
          }
        }
      })
    },
    addNewUser() {
      this.title = '新增用户'
      this.dialogVisible = true
    },
    editData(rowData) {
      console.log(rowData)
      this.title = '编辑用户信息'
      this.postForm = rowData
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" scoped>
.page-user-manage{
  width: 100%;
  padding: 16px 20px;
  box-sizing: border-box;
}
</style>

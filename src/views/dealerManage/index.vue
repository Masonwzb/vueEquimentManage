<template>
  <div class="page-dealer-manage">
    <el-card>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input v-model="queryForm.name" placeholder="名称" clearable />
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
            @click="addNewDealer"
          >新增经销商</el-button>
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
        <el-table-column prop="name" show-overflow-tooltip label="经销商名称" />
        <el-table-column prop="introduction" show-overflow-tooltip label="简介" />
        <el-table-column prop="phoneNumber" label="联系电话" />
        <el-table-column prop="publishStatus" label="发布状态" />
        <el-table-column prop="publishTime" label="发布时间" />
        <!-- <el-table-column prop="creatTime" label="创建时间" align="center" /> -->
        <!-- <el-table-column prop="updateTime" label="修改时间" align="center" /> -->
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
        label-width="120px"
        :rules="postRules"
      >
        <el-form-item prop="name" label="经销商名称：">
          <el-input v-model="postForm.name" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="联系电话：" prop="phoneNumber">
          <el-input v-model="postForm.phoneNumber" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="简介：" prop="introduction">
          <el-input v-model="postForm.introduction" placeholder="请输入简介" />
        </el-form-item>
        <el-form-item label="发布状态:" prop="publishStatus">
          <el-input v-model="postForm.publishStatus" placeholder="请选择" />
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
        name: ''
      },
      postForm: {
        name: '',
        introduction: '',
        phoneNumber: '',
        publishStatus: null,
        publishTime: ''
      },
      postRules: {
        name: [{ required: true, trigger: 'blur', message: '请输入名称' }]
      },
      tableData: [
        {
          name: 'bbbbjt',
          introduction: 'handsomeBoy',
          phoneNumber: '12789314324',
          publishStatus: '已发布',
          publishTime: '2022.02.15',
          creatTime: '2022.02.15',
          updateTime: '2022.02.15'
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
    addNewDealer() {
      this.title = '新增经销商'
      this.dialogVisible = true
    },
    editData(rowData) {
      console.log(rowData)
      this.title = '编辑经销商信息'
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

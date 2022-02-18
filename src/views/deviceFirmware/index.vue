<template>
  <div class="device-firmware-wrapper">
    <el-card>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input v-model="searchValue" placeholder="固件名称" clearable />
        </el-col>
        <el-col :span="18">
          <el-button
            icon="el-icon-search"
            type="primary"
            @click="searchByTitle"
          >搜索</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addDevice"
          >新增固件信息</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card>
      <el-table
        :data="tableData"
        border
        style="width: 100%"
      >
        <el-table-column
          fixed
          prop="title"
          label="固件名称"
          width="250"
        />
        <el-table-column
          prop="fileUrl"
          label="文件地址"
          width="300"
        />
        <el-table-column
          prop="detail"
          label="详情"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleDownloadFirmware(scope.row)"
            >下载固件</el-button>
            <el-button
              type="text"
              class="delete-btn-type"
              size="small"
              @click="handleDeleteClick(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="pagination.total" class="page-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next, jumper"
          :page-sizes="[10, 20, 30, 50, 100]"
          :current-page="pagination.page"
          :page-size="pagination.size"
          :total="pagination.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <update-firmware-dialog ref="myDialog" @firmwaresUpdated="firmwaresUpdated" />
  </div>
</template>

<script>
import updateFirmwareDialog from './updateFirmware.vue'
import { getFirmwaresListByPageInfo, deleteFirmware } from '@/api/deviceFirmware'

export default {
  name: 'DeviceFirmware',

  components: {
    updateFirmwareDialog
  },

  data() {
    return {
      tableData: [{
        title: '王小虎1',
        detail: '上海市普陀区金沙江路 1518 弄',
        fileUrl: '12345'
      }, {
        title: '王小虎2',
        detail: '上海市普陀区金沙江路 1517 弄',
        fileUrl: '123456'
      }, {
        title: '王小虎3',
        detail: '上海市普陀区金沙江路 1519 弄',
        fileUrl: '123456'
      }],
      pagination: {
        page: 1,
        size: 10,
        total: 25
      },
      requestParams: {
        title: '',
        pageNum: 1,
        pageSize: 10
      },
      searchValue: ''
    }
  },

  methods: {
    async handleDeleteClick(row) {
      const { id } = row
      const res = await deleteFirmware({ id })
      if (res) {
        this.$message({
          message: '删除成功',
          type: 'error'
        })
        await this.getFirmwaresList(this.requestParams)
      } else {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      }
    },
    addDevice() {
      this.$refs.myDialog.isShow(true)
    },
    handleSizeChange(size) {
      this.requestParams.pageSize = parseInt(size, 10)
      this.getFirmwaresList(this.requestParams)
    },
    handleCurrentChange(page) {
      this.requestParams.pageNum = parseInt(page, 10)
      this.getFirmwaresList(this.requestParams)
    },
    async getFirmwaresList(params) {
      const { title, pageNum, pageSize } = params

      const res = await getFirmwaresListByPageInfo({
        title: title || '',
        pageNum,
        pageSize
      })

      if (res?.data?.list) {
        this.pagination.total = res.data.total
        this.tableData = res.data.list
      }
    },
    async searchByTitle() {
      this.requestParams.title = this.searchValue
      await this.getFirmwaresList(this.requestParams)
      this.searchValue = ''
    },
    firmwaresUpdated() {
      this.requestParams.title = ''
      this.getFirmwaresList(this.requestParams)
    },
    handleDownloadFirmware(row) {
      if (!row?.fileUrl) return

      const a = document.createElement('a')
      a.href = row.fileUrl
      a.setAttribute('download', '')
      a.click()
    }
  }
}
</script>

<style lang="scss" scoped>
.device-firmware-wrapper {
  margin: 20px;

  .delete-btn-type {
    &.el-button--text {
      color: #F56C6C;
    }
  }
}
</style>

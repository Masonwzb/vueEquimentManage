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
            @click="addNews"
          >新增新闻</el-button>
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
          label="新闻标题"
          width="500"
        />
        <el-table-column
          prop="detail"
          label="详情"
        >
          <template slot-scope="scope">
            <el-button
              type="primary"
              plain
              size="small"
              @click="viewDetail(scope.row)"
            >器材新闻详情查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="handleEditClick(scope.row)"
            >编辑</el-button>
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

    <update-news-dialog ref="myUpdateNewsDialog" @newsUpdated="toGetNewestList" />
    <news-detail-dialog ref="myNewDetailDialog" />
  </div>
</template>

<script>
import UpdateNewsDialog from './updateNews.vue'
import NewsDetailDialog from './newsDetail.vue'
import { getNewsListByPageInfo, deleteNews } from '@/api/deviceNews'

export default {
  name: 'DeviceNews',

  components: {
    UpdateNewsDialog,
    NewsDetailDialog
  },

  data() {
    return {
      tableData: [{
        title: '王小虎1',
        detail: '上海市普陀区金沙江路 1518 弄'
      }, {
        title: '王小虎2',
        detail: '上海市普陀区金沙江路 1517 弄'
      }, {
        title: '王小虎3',
        detail: '上海市普陀区金沙江路 1519 弄'
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
    handleEditClick(row) {
      this.$refs.myUpdateNewsDialog.isShow(true, row)
    },
    async handleDeleteClick(row) {
      const { id } = row
      const res = await deleteNews({ id })
      if (res) {
        this.$message({
          message: '删除成功',
          type: 'error'
        })
        await this.getNewsList(this.requestParams)
      } else {
        this.$message({
          message: '删除失败',
          type: 'error'
        })
      }
    },
    addNews() {
      this.$refs.myUpdateNewsDialog.isShow(true)
    },
    handleSizeChange(size) {
      this.requestParams.pageSize = parseInt(size, 10)
      this.getNewsList(this.requestParams)
    },
    handleCurrentChange(page) {
      this.requestParams.pageNum = parseInt(page, 10)
      this.getNewsList(this.requestParams)
    },
    async getNewsList(params) {
      const { title, pageNum, pageSize } = params

      const res = await getNewsListByPageInfo({
        title: title || '',
        pageNum,
        pageSize
      })

      if (res?.data?.list) {
        this.pagination.total = res.data.total
        this.tableData = res.data.list
        console.log('get news list')
      }
    },
    viewDetail(row) {
      console.log('the detail', row)
      this.$refs.myNewDetailDialog.isShow(row.detail)
    },
    async searchByTitle() {
      this.requestParams.title = this.searchValue
      await this.getNewsList(this.requestParams)
      this.searchValue = ''
    },
    toGetNewestList() {
      this.requestParams.title = ''
      this.getNewsList(this.requestParams)
    }
  }
}
</script>

<style lang="scss" scoped>
.delete-btn-type {
  &.el-button--text {
     color: #F56C6C;
   }
}
</style>

<template>
  <div class="device-firmware-wrapper">
    <el-card>
      <el-row :gutter="10">
        <el-col :span="4">
          <el-input placeholder="固件名称" clearable />
        </el-col>
        <el-col :span="18">
          <el-button
            icon="el-icon-search"
            type="primary"
          >搜索</el-button>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="addDevice"
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
          prop="name"
          label="新闻标题"
          width="150"
        />
        <el-table-column
          prop="fileUrl"
          label="文件地址"
          width="150"
        />
        <el-table-column
          prop="detail"
          label="详情"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
            <el-button
              type="text"
              class="delete-btn-type"
              size="small"
              @click="handleClick(scope.row)"
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

    <update-news-dialog ref="myNewsDialog"></update-news-dialog>
  </div>
</template>

<script>
import UpdateNewsDialog from './updateNews.vue'

export default {
  name: 'DeviceNews',

  components: {
    UpdateNewsDialog
  },

  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      pagination: {
        page: 1,
        size: 10,
        total: 25
      }
    }
  },

  methods: {
    handleClick(row) {
      console.log(row)
    },
    addDevice() {
      this.$refs.myNewsDialog.isShow(true)
    },
    handleSizeChange() {
      console.log('handleSizeChange ? news')
    },
    handleCurrentChange() {
      console.log('handleCurrentChange ? news')
    }
  }
}
</script>

<style scoped>

</style>

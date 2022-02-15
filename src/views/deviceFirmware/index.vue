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
          prop="date"
          label="固件名称"
          width="150"
        />
        <el-table-column
          prop="province"
          label="文件地址"
          width="150"
        />
        <el-table-column
          prop="name"
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
    </el-card>

    <update-device-dialog ref="myDialog"></update-device-dialog>
  </div>
</template>

<script>
import updateDeviceDialog from './updateDevice.vue';

export default {
  name: 'DeviceFirmware',

  components: {
    updateDeviceDialog
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
      }]
    }
  },

  methods: {
    handleClick(row) {
      console.log(row)
    },
    addDevice() {
      this.$refs.myDialog.isShow(true)
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

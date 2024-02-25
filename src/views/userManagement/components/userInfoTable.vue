<template>
  <div>
    <el-form ref="searchForm" :model="searchForm" label-width="125px" :inline="true" :size="size">
      <el-form-item label="用户" prop="username">
        <el-input v-model="searchForm.username" class="width-220">
        </el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="fullname">
        <el-input v-model="searchForm.fullname" class="width-220">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchInitFn" :disabled="tableLoading">查询</el-button>
        <slot name="button" :checked="checked"></slot>
      </el-form-item>
    </el-form>
    <el-table
      :size="size"
      :data="tableData" v-loading="tableLoading"
      @selection-change="handleSelectionChange"
      style="width: 100%; margin-bottom: 22px;">
      <slot name="checked"></slot>
      <el-table-column type="index" :index="setIndexFn" label="序号" width="50">
      </el-table-column>
      <el-table-column prop="username" label="用户名称">
      </el-table-column>
      <el-table-column prop="fullname" label="真实名称">
      </el-table-column>
      <el-table-column prop="password" label="密码">
      </el-table-column>
      <el-table-column prop="show" label="优先级">
        <template slot-scope="scope">
          {{scope.row.show === 1 ? '问卷优先' : '视频优先'}}
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="150">
        <template slot-scope="scope">
          {{timStampToChar(scope.row.create_time)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <slot name="operating" :scope="scope"></slot>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page="pagination.current"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pagination.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
import users from '@/api/users';
import { timStampToChar } from '@/utils/common';

export default {
  props: {
    size: {
      type: String,
      default: 'medium',
    },
  },
  data() {
    return {
      tableLoading: false,
      tableData: [],
      checked: [],
      searchForm: {
        username: '',
        fullname: '',
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  methods: {
    timStampToChar,
    searchInitFn() {
      this.pagination.current = 1;
      this.searchFn();
    },
    resetFormFn() {
      this.$refs.searchForm.resetFields();
    },
    searchFn() {
      this.tableLoading = true;
      users.get({
        ...this.searchForm,
        ...this.pagination,
      }).then(({ data, total }) => {
        this.tableLoading = false;
        this.tableData = data.data;
        this.pagination.total = total ? Number(total) : 0;
      }).catch(() => {
        this.tableLoading = false;
        this.tableData = [];
        this.pagination.total = 0;
      });
    },
    setIndexFn(index) {
      const { current, pageSize } = this.pagination;
      return (current - 1) * pageSize + index + 1;
    },
    sizeChange(val) {
      this.pagination.current = 1;
      this.pagination.pageSize = val;
      this.searchFn();
    },
    currentChange(val) {
      this.pagination.current = val;
      this.searchFn();
    },
    handleSelectionChange(val) {
      this.checked = val;
    },
  },
};
</script>

<style scoped>

</style>

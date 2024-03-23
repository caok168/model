<template>
  <div class="questionnaire-content">
    <el-form :model="searchForm" label-width="125px" :inline="true">
      <el-form-item>
        <!--  -->
        <el-input v-model="searchForm.name" placeholder="Search model by name" class="width-220 input1">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="button" type="primary" @click="searchInitFn">查找</el-button>
        <el-button class="button" type="primary" @click="createFn">创建</el-button>
      </el-form-item>
    </el-form>
    <el-row class="model-list" v-if="tableData.length" :gutter="15">
      <el-col class="model-item" v-for="(item, index) in tableData" :key="index"
        :span="6">
        <div class="model-item-content">
          <div class="model-item-control">
            <el-button class="delete"  type="text" icon="el-icon-delete" @click="deleteFn(item)">
            </el-button>
            <!-- <el-button type="text" icon="el-icon-document" @click="detailFn(item)">
            </el-button> -->
          </div>
          <div class="model-item-image" @click="detailFn(item)">
            <el-image style="width: auto; height: 100%"
              :src="item.upload_image" fit="contain"/>
          </div>
        </div>
        <div class="title">
          {{ item.name }}
          <span :class="item.is_valid ? 'valid' : 'invalid'">
            {{ item.is_valid ? '合格' : '不合格' }}
          </span>
        </div>
        <div class="time">
          <span>{{ timStampToChar(item.created_at) }}</span>
        </div>
        <div>
          <!-- <span :class="item.is_valid ? 'valid' : 'invalid'">
            {{ item.is_valid ? '已提取' : '未提取' }}
          </span> -->
        </div>
      </el-col>
    </el-row>
    <el-empty v-else description="暂无模型数据"></el-empty>
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
import models from '@/api/models';
import { timStampToChar } from '@/utils/common';

export default {
  data() {
    return {
      tableLoading: false,
      tableData: [],
      searchForm: {
        name: '',
      },
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  watch: {
  },
  mounted() {
    this.searchFn();
  },
  methods: {
    timStampToChar,
    createFn() {
      this.$router.push('model/create');
    },
    searchFn() {
      this.tableLoading = true;
      console.log(this.searchForm)
      models.get({
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
    detailFn({ id }) {
      this.$router.push({ path: 'model/detail', query: { id } });
    },
    deleteFn({ id }) {
      this.$confirm('此操作将永久删除该模型, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        models.delete({ id }).then(() => {
          this.$message.success('删除成功!');
          this.searchInitFn();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        });
      });
    },
    searchInitFn() {
      this.pagination.current = 1;
      this.searchFn();
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
  },
};
</script>

<style scoped lang="less">
.model-list {
  margin-bottom: 15px;
  .model-item-content {
    position: relative;
    // padding-top: 56.25%;
    border: 1px solid #EBEEF5;
    border-radius: 5px;
    overflow: hidden;
  }
  .model-item-control {
    position: absolute;
    top: 0;
    right: 5px;
    display: flex;
    align-items: center;
    z-index: 1;
    button {
      padding: 0;
    }
    .el-button+.el-button {
      margin-left: 5px;
    }
  }
  .valid {
    color: #67C23A;
    float: right;
    margin-right: 1px;
  }
  .invalid, .delete {
    color: #F56C6C;
    float: right;
    margin-right: 1px;
  }
  .model-item-image {
    // position: absolute;
    top: 0;
    left: 0;
    // width: 80%;
    width: auto;
    height: 80%;
  }
  .title {
    padding-top: 5px;
    font-weight: bold;
  }
  .time {
    font-size: 12px;
    color: #909399;
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
  }
}

.button {
  font-family: Manrope, sans-serif;
  font-size: 16px;
  font-weight: 600;
  background-color: rgb(255, 136, 46);
  border-width: 0px;
  width: 120px;
  height: 40px;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 8px;
}

.input1 {
  height: 35px;
  line-height: 35px;
  background-color: rgb(241, 242, 246);
}
</style>

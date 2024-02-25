<template>
  <div class="user-content">
    <user-info-table ref="searchTable">
      <template v-slot:button>
        <el-button type="primary" @click="dialogVisible = true">创建用户</el-button>
        <el-button type="primary" @click="dialogSettingVisible = true">设置调查优先级</el-button>
      </template>
      <template v-slot:operating="{ scope }">
        <el-button type="text" @click="editFn(scope.row)">编辑</el-button>
        <el-button type="text" @click="deleteFn(scope.row)">移除</el-button>
      </template>
    </user-info-table>
    <el-dialog
      :title="title" width="560px"
      @close="dialogVisible = false"
      v-loading="dialogLoading"
      :append-to-body="true"
      :visible.sync="dialogVisible">
      <el-form
        :model="dialogForm" :rules="rules"
        label-width="80px" ref="dialogForm">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="dialogForm.username"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="fullname">
          <el-input v-model="dialogForm.fullname"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="dialogForm.sex">
            <el-radio label="1">男</el-radio>
            <el-radio label="2">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="dialogForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dialogForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="dialogForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
        <el-button type="primary" @click="confirmFn">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="设置调查优先级" width="720px"
      @close="dialogSettingVisible = false"
      :append-to-body="true"
      :visible.sync="dialogSettingVisible">
      <user-info-table ref="dialogTable" size="mini">
        <template v-slot:button="{ checked }">
          <el-button type="primary" :disabled="!checked.length || paperLoading || priorityLoading"
                     :loading="videoLoading"
                     @click="priorityFn(checked, 2, 'videoLoading')">
            优先视频
          </el-button>
          <el-button type="primary" :disabled="!checked.length || videoLoading || priorityLoading"
                     :loading="paperLoading"
                     @click="priorityFn(checked, 1, 'paperLoading')">
            优先问卷
          </el-button>
        </template>
        <template v-slot:checked>
          <el-table-column type="selection" width="55">
          </el-table-column>
        </template>
        <template v-slot:operating="{ scope }">
          <el-button type="text" @click="priorityFn([scope.row], 2, 'priorityLoading')"
                     size="mini">优先视频</el-button>
          <el-button type="text" @click="priorityFn([scope.row], 1, 'priorityLoading')"
                     size="mini">优先问卷</el-button>
        </template>
      </user-info-table>
    </el-dialog>
  </div>
</template>

<script>
import users from '@/api/users';
import userInfoTable from './components/userInfoTable.vue';

export default {
  components: {
    userInfoTable,
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (value === '') callback();
      else {
        if (!(/^1[3456789]\d{9}$/.test(value))) {
          callback(new Error('电话号码格式错误'));
        }
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
      if (value === '') callback();
      else {
        if (!(/^([a-zA-Z\d])(\w|-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(value))) {
          callback(new Error('邮箱地址格式错误'));
        }
        callback();
      }
    };
    return {
      dialogLoading: false,
      videoLoading: false,
      paperLoading: false,
      priorityLoading: false,
      dialogVisible: false,
      dialogSettingVisible: false,
      current: null,
      title: '',
      dialogForm: {
        username: '',
        fullname: '',
        sex: '',
        phone: '',
        password: '',
        email: '',
      },
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        }],
        phone: [{
          validator: validatePhone,
          trigger: 'blur',
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        }],
        email: [{
          validator: validateEmail,
          trigger: 'blur',
        }],
      },
    };
  },
  watch: {
    dialogVisible(val) {
      if (val) {
        this.title = '创建用户';
        if (this.current) {
          this.title = '编辑用户';
          this.$nextTick(() => {
            Object.assign(this.dialogForm, this.current);
          });
        }
      } else {
        this.$refs.dialogForm.resetFields();
        this.current = null;
      }
    },
    dialogSettingVisible(val) {
      if (val) {
        this.$nextTick(() => {
          this.$refs.dialogTable.searchInitFn();
        });
      } else {
        this.$refs.dialogTable.resetFormFn();
        this.$refs.searchTable.searchInitFn();
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.searchTable.searchInitFn();
    });
  },
  methods: {
    setIndexFn(index) {
      const { current, pageSize } = this.pagination;
      return (current - 1) * pageSize + index + 1;
    },
    confirmFn() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          let request = users.add;
          let obj = this.dialogForm;
          if (this.current) {
            request = users.put;
            obj = { id: this.current.id, ...this.dialogForm };
          }
          this.dialogLoading = true;
          request(obj).then(() => {
            this.dialogLoading = false;
            this.dialogVisible = false;
            this.$refs.searchTable.searchInitFn();
            this.$message.success(`${this.title}成功`);
          }).catch(() => {
            this.dialogLoading = false;
            this.$message.error(`${this.title}失败`);
          });
        }
      });
    },
    editFn(row) {
      this.current = { ...row };
      this.dialogVisible = true;
    },
    deleteFn({ username, id }) {
      this.$confirm(`确定要删除'${username}'用户吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        this.tableLoading = true;
        users.delete(id).then(() => {
          this.tableLoading = false;
          this.$refs.searchTable.searchInitFn();
          this.$message.success('用户删除成功');
        }).catch(() => {
          this.tableLoading = false;
          this.$message.error('用户删除失败');
        });
      }).catch(() => {
        this.$message.info('已取消删除用户');
      });
    },
    priorityFn(list, type, loading) {
      this[loading] = true;
      const userIds = list.map(({ id }) => id);
      users.set({
        userIds,
        type,
      }).then(() => {
        this[loading] = false;
        this.$refs.dialogTable.searchInitFn();
        this.$message.success('优先级设置成功');
      }).catch(() => {
        this[loading] = false;
        this.$refs.dialogTable.searchInitFn();
        this.$message.error('优先级设置失败');
      });
    },
  },
};
</script>

<style scoped lang="less">
  .user-content {
    .pagination {
      margin-bottom: 22px;
    }
  }
</style>

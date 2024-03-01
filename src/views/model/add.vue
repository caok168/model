<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="" prop="file">
      <el-upload
        class="upload-demo"
        drag
        action=""
        :limit="1"
        :on-success="handleSuccess"
        :on-exceed="handleExceed"
        :on-remove="handleRemove"
        :on-error="handleError"
        :http-request="uploadFn"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-input v-show="false" v-model="form.file"></el-input>
    </el-form-item>
    <el-form-item prop="name" label="活动名称">
      <el-input v-model="form.name" style="width: 360px"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="createFn">创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import models from '@/api/models';
import common from '@/api/common';

export default {
  data() {
    return {
      form: {
        file: undefined,
        name: '',
      },
      rules: {
        file: [
          { required: true, message: '请上传文件', trigger: 'change' },
        ],
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' },
        ],
      },
      fileList: [],
    };
  },
  methods: {
    uploadFn({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append('file', file);
      common.upload(formData).then(({ data }) => {
        onSuccess(data);
      }).catch(() => {
        onError();
      });
    },
    handleSuccess(response, file, fileList) {
      this.form.file = response.data;
      console.log('文件上传成功', response, file, fileList);
    },
    handleExceed() {
      this.$message.warning('仅允许上传一个文件');
    },
    handleRemove() {
      this.form.file = '';
    },
    handleError(err, file, fileList) {
      console.error('文件上传失败', err, file, fileList);
    },
    createFn() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { file, name } = this.form;
          models.add({
            name,
            image_url: file,
          }).then(() => {
            this.$message({
              type: 'success',
              message: '创建成功',
            });
            this.$router.go(-1);
          });
        }
      });
    },
  },
};
</script>

<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      :action="url"
      :on-success="handleSuccess"
      :on-error="handleError"
      :http-request="uploadFn"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <el-button type="primary">获取特征值</el-button>
  </div>
</template>

<script>
import models from '@/api/models';

export default {
  data() {
    return {
      url: '/app/v1/models/create',
    };
  },
  methods: {
    uploadFn({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append('modelName', file.name);
      formData.append('modelFile', file);
      models.add(formData).then(() => {
        onSuccess();
      }).catch(() => {
        onError();
      });
    },
    handleSuccess(response, file, fileList) {
      console.log('文件上传成功', response, file, fileList);
    },
    handleError(err, file, fileList) {
      console.error('文件上传失败', err, file, fileList);
    },
  },
};
</script>

<template>
  <el-row :gutter="15">
    <el-col :span="8">
      <el-image class="upload-image" :src="uploadImage" fit="contain"/>
      <el-button type="primary" style="margin-top: 10px;" @click="getFeautreFn">
        获取特征值
      </el-button>
    </el-col>
    <el-col :span="8">
      <el-upload
        class="clothes-uploader"
        action=""
        :show-file-list="false"
        :http-request="uploadFn"
        :on-error="handleError"
        :on-success="(res) => successFn(res, 'top')"
        :before-upload="(file) => beforeUploadFn(file)">
        <el-image v-if="topImage" style="width: 100%; height: 100%"
              :src="topImage" fit="contain"/>
        <span v-else class="clothes-uploader-tip">请上传上身穿着</span>
      </el-upload>
      <el-upload
        class="clothes-uploader"
        action=""
        :show-file-list="false"
        :http-request="uploadFn"
        :on-success="(res) => successFn(res, 'lower')"
        :before-upload="(file) => beforeUploadFn(file)">
        <el-image v-if="lowerImage" style="width: 100%; height: 100%"
              :src="lowerImage" fit="contain"/>
        <span v-else class="clothes-uploader-tip">请上传上身穿着</span>
      </el-upload>
      <el-button type="primary" style="margin-top: 10px;" @click="inferenceFn">
        生成
      </el-button>
    </el-col>
    <el-col :span="8">
      <el-image v-if="inferenceImage" class="inference-image" :src="inferenceImage"
        fit="contain"/>
      <div v-else class="inference-content">生成展示区域</div>
    </el-col>
  </el-row>
</template>

<script>
import model from '@/api/models';
import common from '@/api/common';

export default {
  data() {
    return {
      id: Number(this.$route.query.id),
      feature: 0,
      uploadImage: '',
      topImage: '',
      lowerImage: '',
      inferenceImage: '',
    };
  },
  mounted() {
    this.getDetailFn();
  },
  methods: {
    getDetailFn() {
      model.detail({ id: this.id }).then(({ data }) => {
        this.uploadImage = data.upload_image;
        this.feature = data.is_valid;
      });
    },
    uploadFn({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append('file', file);
      common.upload(formData).then(({ data }) => {
        onSuccess(data);
      }).catch(() => {
        onError();
      });
    },
    handleError(err, file, fileList) {
      console.error('文件上传失败', err, file, fileList);
    },
    successFn(res, name) {
      this[`${name}Image`] = res.data;
      this.$message.success('文件上传成功');
    },
    beforeUploadFn(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isJPG) {
        this.$message.error('上传衣服文件只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传衣服图片大小不能超过 10MB!');
      }
      return isJPG && isLt2M;
    },
    getFeautreFn() {
      model.feature({ id: this.id }).then(() => {
        this.feature = 1;
        this.$message.success('特征提取成功');
      });
    },
    inferenceFn() {
      if (!this.feature) {
        this.$message.warning('请提取人物照片特征值');
        return;
      }
      if (!this.uploadImage || !this.lowerImage) {
        this.$message.error('请上传上下身穿着衣物');
        return;
      }
      model.inference({
        id: this.id,
        top_image_url: this.topImage,
        lower_image_url: this.lowerImage,
      }).then(({ data }) => {
        this.inferenceImage = data;
        this.$message.success('生成成功');
      });
    },
  },
};
</script>

<style lang="less" scoped>
  .upload-image {
    width: 100%;
    height: 178px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
  .inference-image {
    width: 100%;
    height: 364px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
  }
  .inference-content {
    width: 100%;
    height: 364px;
    border: 1px solid #d9d9d9;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #8c939d;
  }
  .clothes-uploader {
    :deep(.el-upload) {
      width: 100%;
      height: 178px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover {
        border-color: #409EFF;
      }
    }
    .clothes-uploader-tip {
      font-size: 18px;
      color: #8c939d;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>

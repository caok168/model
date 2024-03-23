<template>
  <el-row :gutter="15">
    <el-col :span="8" style="text-align: center;">
      <el-image class="upload-image" :src="uploadImage" fit="contain"/>
      <el-button class="button" type="primary" style="margin-top: 10px; height: 36px;" @click="getFeautreFn">
        获取特征值
      </el-button>
    </el-col>
    <el-col :span="8" style="text-align: center;">
      <div style="text-align: left; padding-bottom: 2px;">上衣展示</div>
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
        
        <div v-else class="clothes-uploader-tip">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>请点击上传上身穿着</em></div>
          <!-- 请上传上身穿着 -->
        </div>
      </el-upload>
      <div style="margin-top: 8px;">Examples</div>
      <div style="margin-top: 8px;">
        <el-image @click="showPic('top1')" style="height: 80px; margin: 0px 2px 0px 0px;"
              :src="topExampleImage1" fit="contain"/>
        <el-image @click="showPic('top2')" style="width: 80px; height: 80px; margin: 0px 2px 0px 0px;"
              :src="topExampleImage2" fit="contain"/>
        <el-image @click="showPic('top3')" style="width: 80px; height: 80px; margin: 0px 2px 0px 0px;"
              :src="topExampleImage3" fit="contain"/>
      </div>

      <div style="text-align: left; padding-bottom: 2px; padding-top: 5px;">下衣展示</div>
      <el-upload
        class="clothes-uploader"
        action=""
        :show-file-list="false"
        :http-request="uploadFn"
        :on-success="(res) => successFn(res, 'lower')"
        :before-upload="(file) => beforeUploadFn(file)">
        <el-image v-if="lowerImage" style="width: 100%; height: 100%"
              :src="lowerImage" fit="contain"/>
        <span v-else class="clothes-uploader-tip">
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><em>请点击上传下身穿着</em></div>
        </span>
      </el-upload>
      <div style="margin-top: 8px;">Examples</div>
      <div style="margin-top: 8px;">
        <el-image @click="showPic('lower1')" style="height: 80px; margin: 0px 2px 0px 0px;"
              :src="lowerExampleImage1" fit="contain"/>
        <el-image @click="showPic('lower2')" style="width: 80px; height: 80px; margin: 0px 2px 0px 0px;"
              :src="lowerExampleImage2" fit="contain"/>
        <el-image @click="showPic('lower3')" style="width: 80px; height: 80px; margin: 0px 2px 0px 0px;"
              :src="lowerExampleImage3" fit="contain"/>
      </div>
      <el-button class="button" type="primary" style="margin-top: 10px; height: 38px;" @click="inferenceFn">
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
      topExampleImage1: 'http://124.222.117.48:9009/img/20240309/abce059e-e1c3-48cc-a696-bbdd161852ff.jpg',
      topExampleImage2: 'http://124.222.117.48:9009/img/20240309/80ca1f80-8c45-4a1d-b62c-e8291782579a.jpg',
      topExampleImage3: 'http://124.222.117.48:9009/img/20240309/6ddb8248-fca0-47eb-b149-96b78584499c.jpg',
      lowerExampleImage1: 'http://124.222.117.48:9009/img/20240309/67058c6f-2623-45f7-8b75-787081a0a7bd.jpg',
      lowerExampleImage2: 'http://124.222.117.48:9009/img/20240309/ecc12ed4-d503-490c-aa89-be95e8ab5379.jpg',
      lowerExampleImage3: 'http://124.222.117.48:9009/img/20240309/e04a60ab-9cb2-4dbd-8623-6e4c8362957e.jpg',
    };
  },
  mounted() {
    this.getDetailFn();
  },
  methods: {
    showPic(index) {
        if (index === 'lower1') {
          this.lowerImage = this.lowerExampleImage1;
        } else if (index === 'lower2') {
          this.lowerImage = this.lowerExampleImage2;
        } else if (index === 'lower3') {
          this.lowerImage = this.lowerExampleImage3;
        } else if (index === 'top1') {
          this.topImage = this.topExampleImage1;
        } else if (index === 'top2') {
          this.topImage = this.topExampleImage2;
        } else if (index === 'top3') {
          this.topImage = this.topExampleImage3;
        }
        
    },
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
    height: 350px;
    border: 0px solid #d9d9d9;
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
      margin-top: 3px;
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
  .button {
      font-family: Manrope, sans-serif;
      font-size: 16px;
      // font-weight: 600;
      background-color: rgb(255, 136, 46);
      border-width: 0px;
      width: 120px;
      height: 40px;
      color: rgba(0, 0, 0, 0.87);
      border-radius: 8px;
      &:hover{
            background: #ff882e;
        }
    }
</style>

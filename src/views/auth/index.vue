<template>
  <div class="authLayout">
    <div class="container">
      <p class="theme">TryOn</p>
      <div class="content">
        <div class="back-tip">
          <el-button v-if="type === 'login'" icon="el-icon-arrow-left" type="text"
            @click="type='register'">注 册</el-button>
          <el-button v-else type="text" icon="el-icon-arrow-left"
            @click="type='login'">登 录</el-button>
        </div>
        <el-form v-if="type!==''" class="login" :model="authForm" :rules="rules"
          ref="authForm">
          <template v-if="type==='login' && !showPassword">
            <el-button class="google" type="primary" @click="googleSignIn">Google 登录</el-button>
            <div class="select-tip">or</div>
          </template>
          <el-form-item label="" prop="email" key="email">
            <el-input v-model="authForm.email" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item v-show="type==='register' || showPassword" label="" prop="password"
            key="password">
            <el-input v-model="authForm.password" show-password
                      @keyup.enter.native="authFn"
                      prefix-icon="el-icon-mobile"></el-input>
          </el-form-item>
          <el-form-item label="" prop="remember">
            <el-button type="primary" style="width: 100%; height: 40px;"
                       @click="authFn">
              {{ type === 'register' ? '注 册' : '登 录' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <p class="version">版权所有：香港大学教育学院学科教学知识测试的研究课题组</p> -->
      <!-- <p class="bottom_info"><a href="https://beian.miit.gov.cn/"></a></p> -->
    </div>
  </div>
</template>

<script>
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import profiles from '@/api/profiles';

export default {
  data() {
    return {
      type: 'login',
      showPassword: false,
      authForm: {
        email: '',
        password: '',
      },
      rules: {
        email: [{
          required: true,
          message: '请输入邮箱',
          trigger: 'blur',
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        }],
      },
    };
  },
  watch: {
    'authForm.email': {
      handler(val) {
        this.showPassword = !!val;
      },
    },
  },
  mounted() {
    GoogleAuth.initialize({
      clientId: '647725136259-3djfro50mv7gdbreml8a8vm1uv4s4kur.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
      grantOfflineAccess: true,
    });
  },
  methods: {
    async googleSignIn() {
      const googleUser = await GoogleAuth.signIn();
      if (googleUser) {
        this.googleLoginFn(googleUser);
      } else {
        this.$message.error('登录失败');
      }
    },
    logincallbackFn(data) {
      localStorage.setItem('userInfo', JSON.stringify({
        email: this.authForm.email,
        ...data,
      }));
      this.$router.push('/model');
    },
    googleLoginFn({ email }) {
      profiles.loginGoogle({ email }).then((data) => {
        this.$message.success('登录成功');
        this.logincallbackFn(data);
      }).catch(() => {
        this.$message.error('登录失败');
      });
    },
    authFn() {
      this.$refs.authForm.validate((valid) => {
        if (valid) {
          const request = profiles[this.type];
          let label = '登录';
          let callback = this.logincallbackFn;
          if (this.type === 'register') {
            label = '注册';
            callback = () => {
              this.$refs.authForm.resetFields();
              this.type = 'login';
            };
          }
          request(this.authForm).then(({ data }) => {
            this.$message.success(`${label}成功`);
            callback(data);
          }).catch(() => {
            this.$message.error(`${label}失败`);
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less">
  .authLayout {
    height: 100%;
  }
  .container {
    width: 100%;
    min-height: 100%;
    background-size: 100%;
    padding: 120px 0 114px;
    position: relative;
    box-sizing: border-box;
    .theme {
      font-size: 36px;
      font-weight: bold;
      text-align: center
    }
    .content {
      margin: 0 auto;
      text-align: center;
      width: 370px;
      .google {
        width: 100%;
      }
      .back-tip {
        display: flex;
        justify-content: right;
        align-items: center;
        transition: all .3s;
      }
      .google {
        margin-top: 4px;
      }
      .select-tip {
        padding: 12px 0;
      }
    }
    .version {
      position: absolute;
      bottom: 40px;
      width: 100%;
      text-align: center;
    }
    .bottom_info {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
    }
  }
</style>

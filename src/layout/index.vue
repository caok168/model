<template>
  <el-container>
    <el-aside :width="width" style="transition: 0.3s">
      <Menu :collapse="collapse"></Menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="control">
          <i :class="['collapse', icon]" @click="changeFn"></i>
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: subTitle.path }">
              {{subTitle.title}}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="userInfo">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <el-avatar size="small" :src="src" style="margin-right: 10px;"
                         fit="cover" icon="el-icon-user-solid"></el-avatar>
              {{userName}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">
                <i class="el-icon-switch-button"/>
                个人资料
              </el-dropdown-item>
              <el-dropdown-item command="logout">
                <i class="el-icon-switch-button"/>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-main :class="[{'special': $route.meta.special}]">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import profiles from '@/api/profiles';
import Menu from './components/menu.vue';

export default {
  components: {
    Menu,
  },
  watch: {
    collapse(val) {
      if (val) {
        this.icon = 'el-icon-s-unfold';
        this.width = '64px';
      } else {
        this.icon = 'el-icon-s-fold';
        this.width = '256px';
      }
    },
  },
  computed: {
    subTitle() {
      const { path, meta } = this.$route && this.$route.matched[1];
      return { path: path || '', title: meta.title || '', parent: meta.parent };
    },
    collapse() {
      return this.$store.state.collapse;
    },
  },
  data() {
    return {
      userName: 'admin',
      icon: 'el-icon-s-fold',
      width: '256px',
      src: '',
      loading: false,
    };
  },
  mounted() {
    const infoJson = localStorage.getItem('userInfo');
    if (infoJson) {
      const { username } = JSON.parse(infoJson);
      this.userName = username;
    }
    // this.searchFn();
  },
  methods: {
    changeFn() {
      this.$store.dispatch('actionChange');
    },
    // searchFn() {
    //   questions.get().then(({ data }) => {
    //     if (data && data.isCommit) {
    //       this.$store.dispatch('actionChangeIsCommit', data.isCommit);
    //     }
    //   });
    // },
    handleCommand(command) {
      switch (command) {
        case 'logout':
          this.logoutFn();
          break;
        default:
          break;
      }
    },
    logoutFn() {
      profiles.logout().then(() => {
        this.$message.success('退出登录成功');
        localStorage.removeItem('userInfo');
        this.$store.dispatch('actionReset');
        this.$router.push('/login');
      }).catch(() => {
        this.$message.error('退出登录失败');
      });
    },
  },
};
</script>

<style scoped lang="less">
  .el-container {
    height: 100%;
    overflow: hidden;
  }

  .el-header {
    background-color: #fff;
    color: #5a5a5a;
    padding: 0;
    height: 64px !important;
    line-height: 64px;
    display: flex;
    justify-content: space-between;
    .control {
      display: flex;
      .el-breadcrumb {
        line-height: inherit;
      }
      .collapse {
        line-height: inherit;
        color: rgba(0,0,0,.65);
        font-size: 18px;
        padding: 0 24px;
        cursor: pointer;
        transition: color .3s;
      }
    }
    .userInfo {
      padding: 0 15px;
      cursor: pointer;
      display: flex;
      align-items: center;
      .el-dropdown-link {
        padding: 0 15px;
        display: flex;
        align-items: center;
        &:hover {
          background: rgba(0, 0, 0, .025);
        }
      }
    }
  }

  .el-main {
    background: #fff;
    margin: 16px;
  }

  .special {
    padding: 0;
    margin: 0;
    background: #f0f2f5;
    & > div {
      height: 100%;
    }
  }

  .el-aside {
    height: 100%;
    overflow-x: hidden;
    background: rgb(0, 21, 41);
  }
</style>

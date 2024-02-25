<template>
  <div>
    <div :class="['theme', { 'putAway': collapse }]" @click="goHomeFn">
      平台
    </div>
    <el-menu class="column-menu" :collapse="collapse" :default-active="current"
             router>
      <el-menu-item v-for="{ path, meta } of menus"
                    :key="path" :index="path">
        <i :class="[`el-icon-${meta.icon}`]"></i>
        <span slot="title">{{meta.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    collapse: Boolean,
  },
  computed: {
    current() {
      const { fullPath } = this.$route;
      return fullPath.replace(/^(\/[^/]*)[/|?].*/, '$1');
    },
    menus() {
      return this.$router.options.routes[0].children.filter((item) => {
        const obj = item;
        const userInfo = localStorage.getItem('userInfo');
        const { roleId } = userInfo ? JSON.parse(userInfo) : {};
        const { isCommit } = this.$store.state;
        const { hidden, meta: { authority, show } } = obj;
        obj.disabled = show && roleId !== 1
          && (!isCommit || isCommit !== 1);
        return !hidden && (!authority || this.admin);
      });
    },
  },
  data() {
    return {
      admin: false,
    };
  },
  mounted() {
    const json = localStorage.getItem('userInfo');
    if (json) {
      const { roleId } = JSON.parse(json);
      if (roleId === 1) this.admin = true;
    }
  },
  methods: {
    goHomeFn() {
      this.$router.push('/learningPlatform');
    },
  },
};
</script>

<style scoped lang="less">
  .theme {
    cursor: pointer;
    height: 64px;
    text-align: center;
    line-height: 64px;
    font-weight: 700;
    font-size: 20px;
    overflow: hidden;
    color: #fff;
    background: rgba(0, 40, 77, 1);
    transition: all 0.3s ease 0s;
    &.putAway {
      padding: 0 5px;
      line-height: 22px;
      font-size: 16px;
    }
  }

  .el-menu {
    border: 0;
    background: rgb(0, 21, 41);
    .el-menu-item {
      background: rgb(0, 21, 41);
      color: rgba(255, 255, 255, 0.67);
      margin: 4px 0 8px;
      height: 40px;
      line-height: 40px;
      i {
        color: inherit;
        vertical-align: -.125em;
      }
      &:hover {
        color: rgba(255, 255, 255, 1);
      }
    }
    .is-active {
      background: rgba(24, 144, 255, 1);
      color: rgba(255, 255, 255, 1);
    }
  }
  .column-menu:not(.el-menu--collapse) {
    width: 256px;
  }
</style>

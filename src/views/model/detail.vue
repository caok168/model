<template>
  <div>
    <el-button type="primary" style="margin-top: 10px;">获取特征值</el-button>
  </div>
</template>

<script>

export default {
  data() {
    return {
    };
  },
  mounted() {
    console.log(this.$route.query.id);
  },
  methods: {
  },
};
</script>

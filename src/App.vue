<template>
  <div id="app">
    <router-view/>
    <!-- <p class="bottom_info"><a href="https://beian.miit.gov.cn/">1</a></p> -->
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-width: 720px;
  height: 97%;
}

.bottom_info {
      position: absolute;
      bottom: 0px;
      width: 100%;
      text-align: center;
    }
</style>

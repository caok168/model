<template>
    <div>
      <HeaderComponent />
      <router-view></router-view>
      <FooterComponent />
    </div>
  </template>
  
  <script>
      import HeaderComponent from './components/HeaderPage.vue';
      import ContentComponent from './components/Content.vue';
      import FooterComponent from './components/FooterPage.vue';
      export default {
          components: {
              HeaderComponent,
              ContentComponent,
              FooterComponent
          }
      };
  </script>
  
  <style>
  #app {
    /* font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50; */
    /* margin-top: 60px; */
  }
  </style>
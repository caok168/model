<template>  
    <header class="header">  
      <div class="header-content">  
        <a href="/" class="logo">  
          <img src="@/assets/logo_tryon.png" alt="Moralis Logo" />  
          <span class="logo-text">TryOn</span>  
        </a>  
          
        <nav class="main-nav">  
          <ul>  
            <li><router-link to="/home/main">首页</router-link></li>  
            <!-- <li><router-link to="/products">产品</router-link></li>   -->
            <li class="dropdown">  
              <a href="#" class="dropdown-toggle">产品</a>  
              <!-- <ul class="dropdown-menu">  
                <li><router-link to="/products/item1">产品1</router-link></li>  
                <li><router-link to="/products/item2">产品2</router-link></li>  
                <li><router-link to="/products/item3">产品3</router-link></li>  
              </ul>   -->
              <div class="dropdown-menu">
                <router-link to="/home/product">产品1</router-link>
                <router-link to="/products/item1">产品2</router-link>
                <router-link to="/products/item1">产品3</router-link>
              </div>
          </li> 
            <li><router-link to="/home/price">定价</router-link></li>  
            <li><router-link to="/home/news">最新消息</router-link></li>  
            <li><router-link to="/home/about">关于我们</router-link></li>  
          </ul>  
        </nav>  
          
        <div class="header-actions">  
          <!-- <button class="search-btn">搜索</button>   -->
          <button class="login-btn" v-if="!isLoggedIn" @click="login">登录</button>  
          <button class="logout-btn" v-else @click="logout">退出</button>  
        </div>  
      </div>  
    </header>  
  </template>  
    
  <script>  
  export default {
    name: 'HeaderPage',  
    data() {  
      return {  
        isLoggedIn: false, // 假设用户未登录，实际项目中应从后端或Vuex获取登录状态  
      };  
    },  
    methods: {  
      logout() {  
        // 这里应该添加实际的退出逻辑，比如清除本地存储的token或调用API  
        this.isLoggedIn = false;  
        // 可能需要重定向到登录页面或其他页面  
        this.$router.push('/auth');  
      },
      login() {
        this.$router.push('/auth'); 
      }
    },  
  };  
  </script>  
    
  <style scoped>  
  .header { 
    background-color: #333;  
    color: white;  
    padding: 15px 0;  
  }  
    
  .header-content {  
    display: flex;  
    justify-content: space-between;  
    align-items: center;  
    max-width: 1200px;  
    margin: 0 auto;  
  }  
    
  .logo {  
    display: flex;  
    align-items: center;  
    text-decoration: none;  
    color: white;  
    font-weight: bold;  
    font-size: 24px;  
  }  
    
  .logo img {  
    width: 40px;  
    height: 40px;  
    margin-right: 10px;  
  }  
    
  .main-nav ul {  
    list-style: none;  
    display: flex;
  }  
    
  .main-nav li {  
    position: relative;
    margin-right: 40px;  
  }  
    
  .main-nav li a {  
    color: white;
    font-size: 18px;
    text-decoration: none;
  }

  
  /* .dropdown a {
    display: block;
    color: white;
    padding: 10px;
    text-decoration: none;
  } */

  .dropdown-menu {  
    display: none; /* 初始时隐藏下拉框 */  
    position: absolute;  
    top: 100%; /* 下拉框位于其父元素的底部 */  
    left: 0;  
    background-color: #555;  
    min-width: 80px;  
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);  
    z-index: 1;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .dropdown-menu a {
    display: block;
    color: white;
    padding: 10px;
    text-align: left;
    text-decoration: none;
  }

  .dropdown-menu a:hover {
    background-color: #777;
  }
  
  /* .dropdown-menu li {
    display: none;
  }  
    
  .dropdown-menu li a {  
    color: black;  
    padding: 12px 16px;  
    text-decoration: none;  
    display: block;  
  }   */
    
  .dropdown:hover .dropdown-menu {  
    display: block; /* 鼠标悬停时显示下拉框 */  
  }  
    
  .header-actions {  
    display: flex;  
  }  
    
  .search-btn,  
  .login-btn,  
  .logout-btn {  
    background-color: #555;  
    border: none;  
    color: white;  
    padding: 5px 10px;  
    cursor: pointer;  
    margin-left: 10px;  
  }  
    
  .logout-btn {  
    display: none; /* 初始时不显示退出按钮 */  
  }  
  </style>
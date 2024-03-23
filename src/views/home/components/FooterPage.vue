<template>
    <footer class="footer">
      <div class="footer-content">
        <p>版权所有 &copy; 2024</p>
        <ul>
          <li><a href="#">联系我们</a></li>
          <li><a href="#">隐私政策</a></li>
          <li><a href="#">使用条款</a></li>
        </ul>
        <div class="footer-cta">
          <a class="cta-button" href="#">加入我们</a>
          <a class="cta-link" href="#">了解更多</a>
        </div>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'FooterPage',
    props: {
      // 如果你需要传递数据到Footer组件，可以在这里定义props
    },
    methods: {
      // 这里可以包含一些方法
    }
  };
  </script>
  
  <style scoped>
  /* 组件的CSS */
  .footer {
    background-color: #222;
    color: white;
    padding: 10px 0;
    text-align: center;
  }
  
  .footer-content {
    max-width: 90%;
    margin: 0 auto;
  }
  
  .footer-content p {
    line-height: 1.6;
    margin-top: 10px;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  ul li {
    display: inline-block;
    margin-right: 20px;
  }
  
  ul li a {
    text-decoration: none;
    color: white;
  }
  
  .footer-cta {
    margin-top: 20px;
  }
  
  .cta-button {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    text-decoration: none;
  }
  
  .cta-link {
    color: #4CAF50;
    text-decoration: underline;
    margin-left: 10px;
  }
  </style>
  
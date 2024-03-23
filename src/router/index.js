import Vue from 'vue';
import VueRouter from 'vue-router';
import ModelRouter from '@/router/model';
// import UserManagementRouter from '@/router/userManagement';
import AuthRouter from '@/router/auth';
import ExceptionRouter from '@/router/exception';
import HomeRourer from '@/router/home'

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/model',
    component: () => import('@/layout/index.vue'),
    redirect: '/model',
    children: [
      ModelRouter,
    ],
  },
  {
    path: '/',
    // component: () => import('@/layout/index.vue'),
    component: () => import('@/views/home/IndexLayout.vue'),
    redirect: '/home/main',
    children: [
      HomeRourer,
    ],
  },
  // HomeRourer,
  AuthRouter,
  ExceptionRouter,
  {
    path: '*', redirect: '/404',
  },
  
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, form, next) => {
  const userInfo = localStorage.getItem('userInfo');
  const { isLogin, authority } = to.meta;
  console.log(to);
  console.log(userInfo);
  if (!userInfo && !isLogin) {
    console.log(to);
    console.log(to.path);
    if (to.path.includes('home')) {
      next();
    } else {
      next('/auth');
    }
  } else if (userInfo) {
    const { roleId } = JSON.parse(userInfo);
    if (isLogin) next(false);
    else if (!authority || roleId === 1) next();
    else next('/404');
  } else next();
});

export default router;

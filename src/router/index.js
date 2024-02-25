import Vue from 'vue';
import VueRouter from 'vue-router';
import modelRouter from '@/router/model';
// import UserManagementRouter from '@/router/userManagement';
import AuthRouter from '@/router/auth';
import ExceptionRouter from '@/router/exception';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    redirect: '/model',
    children: [
      modelRouter,
      // UserManagementRouter,
    ],
  },
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
  if (!userInfo && !isLogin) {
    next('/auth');
  } else if (userInfo) {
    const { roleId } = JSON.parse(userInfo);
    if (isLogin) next(false);
    else if (!authority || roleId === 1) next();
    else next('/404');
  } else next();
});

export default router;

const router = {
  path: '/userManagement',
  meta: {
    title: '用户管理',
    icon: 'user',
    show: true,
  },
  component: () => import('@/views/transition.vue'),
  children: [{
    meta: {},
    path: '',
    component: () => import('@/views/userManagement/index.vue'),
  }],
};

export default router;

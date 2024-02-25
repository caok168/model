const router = {
  path: '/model',
  meta: {
    title: 'Try On',
    icon: 'user',
    show: true,
  },
  component: () => import('@/views/transition.vue'),
  children: [{
    meta: {},
    path: '',
    component: () => import('@/views/model/index.vue'),
  }, {
    meta: {},
    path: 'create',
    component: () => import('@/views/model/add.vue'),
  }],
};

export default router;

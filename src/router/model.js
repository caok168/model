const router = {
  path: '',
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
  }, {
    meta: {},
    path: 'detail',
    component: () => import('@/views/model/detail.vue'),
  }],
};

export default router;


const router = {
  path: '/home',
  meta: {
    title: 'home',
    icon: 'user',
    show: false,
  },
  // component: () => import('@/views/home/IndexLayout.vue'),
  component: () => import('@/views/transition.vue'),
  children: [{
    meta: {},
    path: 'main',
    component: () => import('@/views/home/IndexPage.vue'),
  }, {
    meta: {},
    path: 'price',
    component: () => import('@/views/home/PricePage.vue'),
  }, {
    meta: {},
    path: 'product',
    component: () => import('@/views/home/ProductPage.vue'),
  }, {
    meta: {},
    path: 'news',
    component: () => import('@/views/home/NewsPage.vue'),
  }, {
    meta: {},
    path: 'about',
    component: () => import('@/views/home/AboutPage.vue'),
  }],
};

export default router;
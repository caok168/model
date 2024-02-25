const router = {
  path: '/auth',
  meta: {
    isLogin: true,
  },
  component: () => import('@/views/auth/index.vue'),
};

export default router;

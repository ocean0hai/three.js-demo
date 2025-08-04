import { RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw[] = [
  {
    path: 'demo-1',
    name: 'demo-1',
    component: () => import('@/pages/three.js-h/demo-1.vue'),
    meta: {
      title: '坐标辅助-轨道控制',
      keepAlive: true,
    },
  },
  {
    path: 'demo-2',
    name: 'demo-2',
    component: () => import('@/pages/three.js-h/demo-2.vue'),
    meta: {
      title: '位移和父子级元素',
      keepAlive: true,
    },
  },
  {
    path: 'demo-3',
    name: 'demo-3',
    component: () => import('@/pages/three.js-h/demo-3.vue'),
    meta: {
      title: '旋转和缩放',
      keepAlive: true,
    },
  },
  {
    path: 'demo-4',
    name: 'demo-4',
    component: () => import('@/pages/three.js-h/demo-4.vue'),
    meta: {
      title: 'GUI调试',
      keepAlive: true,
    },
  },
  {
    path: 'demo-5',
    name: 'demo-5',
    component: () => import('@/pages/three.js-h/demo-5.vue'),
    meta: {
      title: '几何体、点、线、面',
      keepAlive: true,
    },
  },
  {
    path: 'demo-6',
    name: 'demo-6',
    component: () => import('@/pages/three.js-h/demo-6.vue'),
    meta: {
      title: '几何体的多面材质',
      keepAlive: true,
    },
  },
  {
    path: 'demo-7',
    name: 'demo-7',
    component: () => import('@/pages/three.js-h/demo-7.vue'),
    meta: {
      title: '贴图加载  ',
      keepAlive: true,
    },
  },
]

export default {
  path: '/three.js-h',
  name: 'three.js-h',
  children: router,
  redirect: '/three.js-h/demo-1',
  meta: {
    title: 'three.js-h',
    keepAlive: true,
  },
}
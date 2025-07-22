import { RouteRecordRaw } from 'vue-router'

const router: RouteRecordRaw[] = [
  {
    path: 'demo-1',
    name: 'demo-1',
    component: () => import('@/pages/three.js/demo-1.vue'),
    meta: {
      title: '坐标辅助-轨道控制',
      keepAlive: true,
    },
  },
  {
    path: 'demo-2',
    name: 'demo-2',
    component: () => import('@/pages/three.js/demo-2.vue'),
    meta: {
      title: '位移和父子级元素',
      keepAlive: true,
    },
  },
  {
    path: 'demo-3',
    name: 'demo-3',
    component: () => import('@/pages/three.js/demo-3.vue'),
    meta: {
      title: '旋转和缩放',
      keepAlive: true,
    },
  },
  {
    path: 'demo-4',
    name: 'demo-4',
    component: () => import('@/pages/three.js/demo-4.vue'),
    meta: {
      title: 'GUI调试',
      keepAlive: true,
    },
  },
]

export default {
  path: '/three.js',
  name: 'three.js',
  children: router,
  redirect: '/three.js/demo-1',
  meta: {
    title: 'three.js',
    keepAlive: true,
  },
}
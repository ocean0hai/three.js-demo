//router目录下的index.js
import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from "vue-router"

import three from "./three"

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/pages/index.vue'),
    children: [],
    meta: {
      title: '首页',
    },
  },
  three,
]

/**
 * 创建路由
 */
const router = createRouter({
  history: createWebHistory(),
  routes,
  // 刷新时，滚动条位置还原
  scrollBehavior: () => ({ left: 0, top: 0 }),
});
function setupRouter() {
  return routes
}
export { router, setupRouter } 

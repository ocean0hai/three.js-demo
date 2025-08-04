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
]

export default {
  path: '/three.js-c',
  name: 'three.js-c',
  children: router,
  redirect: '/three.js-c/demo-1',
  meta: {
    title: 'three.js-c',
    keepAlive: true,
  },
}

function render(row: Array<any>) {
  // 当前列的开始时间
  const currentStartDate = new Date()
  // '当前列的00:00:00'
  const newDate = 0
  // 查找出这个行的，再这个区间
  const mapRow = row.filter(item => item.entTime > currentStartDate)
  if (!mapRow) {
    return '没有数据'
  }
  // 是不是跨天
  if (mapRow[0].startTime < newDate) {
    return '渲染为跨天'
  }
}
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// 场景 scene
const scene = new THREE.Scene()

const sizes = {
  width: 600,
  height: 600,
}

function renderWebGL() {
  // 相机
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  camera.position.z = 5
  camera.position.x = 2
  camera.position.y = 3
  camera.lookAt(0, 0, 0)

  scene.add(camera)

  // 代码开头创建一个变量，然后获取在 HTML 中使用创建的元素并将其存储在其中
  const renderer = new THREE.WebGLRenderer()
  renderer.setSize(sizes.width, sizes.height)

  // 添加轨道控制器
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  // 阻尼系数
  controls.dampingFactor = 0.05
  // 旋转速度
  controls.rotateSpeed = 0.5

  // 获取页面元素
  const dom = document.getElementById('test')
  dom?.appendChild(renderer.domElement)

  // 创建一个几何图形
  const geometry = new THREE.BoxGeometry()
  // 使用什么材质
  const material = new THREE.MeshBasicMaterial({ color: 0x00FF00 })
  const childrenMaterial = new THREE.MeshBasicMaterial({ color: 0xFF0000 })
  // 网格
  const parent = new THREE.Mesh(geometry, material)
  const children = new THREE.Mesh(geometry, childrenMaterial)

  parent.add(children)
  // 调用方法设置位置 x,y,z
  // 父元素位置
  parent.position.set(0, 0, 1)
  // 子元素位置（相对父元素，就是以父元素为原点）
  children.position.set(0, 0, 2)

  // 旋转,设置父级选择，子级也会相应的旋转
  // parent.rotation.x = Math.PI / 4
  // 旋转,设置子级选择，父级不会相应的旋转
  children.rotation.x = Math.PI / 4

  // 缩放也是如此
  parent.scale.set(2, 2, 2)

  // 加入场景中
  scene.add(parent)

  // 添加辅助线
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  function animate() {
    requestAnimationFrame(animate)
    // 轨道控制器更新
    controls.update()

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    // 渲染器上的方法并向其发送scene和 作为camera参数
    renderer.render(scene, camera)
  }
  animate()
  return {
    camera,
    renderer,
  }
}
const screenRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  const { camera, renderer } = renderWebGL()
  if (screenRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        const height = entry.contentRect.height
        console.log('screen宽度变化:', width, height)
        // 你可以在这里做更多处理
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
    })
    resizeObserver.observe(screenRef.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver && screenRef.value) {
    resizeObserver.unobserve(screenRef.value)
    resizeObserver.disconnect()
  }
})
</script>

<template>
  <div id="screen" ref="screenRef">
    <div id="test" />
  </div>
</template>

<style scoped></style>

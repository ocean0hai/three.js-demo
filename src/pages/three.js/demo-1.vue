<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onMounted } from 'vue'

// 场景 scene
const scene = new THREE.Scene()

const sizes = {
  width: 800,
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
  // 网格
  const cube = new THREE.Mesh(geometry, material)
  // 加入场景中
  scene.add(cube)

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
}
onMounted(() => {
  renderWebGL()
})
</script>

<template>
  <div>
    <div id="test" style="width: 800px;height: 600px;" />
  </div>
</template>

<style scoped></style>

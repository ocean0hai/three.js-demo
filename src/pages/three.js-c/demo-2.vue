<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onBeforeUnmount, onMounted, ref } from 'vue'
// gui的使用方法
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

// 场景 scene
const scene = new THREE.Scene()
const screenRef = ref<HTMLElement | null>(null)
let resizeObserver: ResizeObserver | null = null
const sizes = {
  width: 600,
  height: 600,
}

function renderWebGL() {
  // 相机
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  camera.position.z = 5
  camera.position.x = 4
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

  // 添加辅助线
  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  function animate() {
    requestAnimationFrame(animate)
    // 轨道控制器更新
    controls.update()

    // 渲染器上的方法并向其发送scene和 作为camera参数
    renderer.render(scene, camera)
  }
  animate()
  return {
    camera,
    renderer,
  }
}

onBeforeUnmount(() => {
  if (resizeObserver && screenRef.value) {
    resizeObserver.unobserve(screenRef.value)
    resizeObserver.disconnect()
  }
})

// 创建GUI   （用gui替代上一节点击事件
const gui = new GUI()
//lil gui 调试开发3d效果
const eventObj = {
  fullScreenFn: () => {
    document.body.requestFullscreen()
  },
  exitFullScreenFn: () => {
    document.exitFullscreen()
  },
}
function createGui() {
  // 控制立方体位置
  // const fullScreen = gui.addFolder('全屏设置') //生成文件夹  添加分组

  gui.add(eventObj, 'fullScreenFn').name('全屏')
  gui.add(eventObj, 'exitFullScreenFn').name('退出全屏')
}

onMounted(() => {
  // 自适应
  const { camera, renderer } = renderWebGL()
  if (screenRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        const height = entry.contentRect.height
        // 你可以在这里做更多处理
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
      }
    })
    resizeObserver.observe(screenRef.value)
  }
  createGui() // 创建GUI
  loadTexture() // 加载纹理
})


// 基础的贴图加载
function loadTexture() {
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load(
    'https://threejs.org/examples/textures/crate.gif',
    () => {
      // 加载完成后执行的回调
      console.log('Texture loaded successfully')
    },
    undefined,
    (error) => {
      console.error('An error occurred while loading the texture:', error)
    }
  )

  // 创建一个立方体并应用纹理
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  const material = new THREE.MeshBasicMaterial({ map: texture })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  return cube
}
</script>

<template>
  <el-card>
    <div id="screen" ref="screenRef">
      <div id="test" />
    </div>
  </el-card>
</template>

<style scoped></style>

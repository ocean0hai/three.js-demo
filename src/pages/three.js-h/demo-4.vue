<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onBeforeUnmount, onMounted, ref } from 'vue'
// gui的使用方法
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min'

// 场景 scene
const scene = new THREE.Scene()
let parent = null
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

  // 创建一个几何图形
  const geometry = new THREE.BoxGeometry(1, 1, 1)
  // 使用什么材质
  const material = new THREE.MeshLambertMaterial({
    color: '#129b12', // 绿色
  })
  // 网格
  parent = new THREE.Mesh(geometry, material)

  // 父元素位置
  parent.position.set(0, 0, 0)
  // 缩放也是如此
  parent.scale.set(1, 1, 1)

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
  const folder = gui.addFolder('立方体位置') //生成文件夹  添加分组
  folder.add(parent.position, 'x')
    .min(-10)
    .max(10)
    .step(1)
    .name('立方体x轴位置')
    .onChange((val) => {
      console.log(val, '立方体位置')
    })
  folder
    .add(parent.position, 'y')
    .min(-10)
    .max(10)
    .step(1)
    .name('立方体y轴位置')
    .onFinishChange((val) => {
      console.log(val, '立方体位置')
    })
  folder.add(parent.position, 'z').min(-10).max(10).step(1).name('立方体z轴位置')

  // 设置颜色
  // 初始化颜色
  const colorParams = {
    color: '#00FF00', // 默认颜色
  }
  folder.addColor(colorParams, 'color').name('立方体颜色').onChange((color) => {
    // 更新材质颜色
    parent.material.color.set(color)
  })
  // 设置线框模式
  folder.add(parent.material, 'wireframe')
    .name('线框模式')
    .onChange((value) => {
      // parent.material.wireframe = value
    })
}

// 创建光源
function createLight() {
  const light = new THREE.PointLight(0xffffff, 1, 0, 0)
  // 设置光源位置
  light.position.set(130, 30, 30)
  scene.add(light)
  // 创建一个环境光，颜色为白色，强度为0.5
  const lightAmbient = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(lightAmbient)
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
  createLight() // 创建光源
})

</script>

<template>
  <el-card>
    <div id="screen" ref="screenRef">
      <div id="test" />
    </div>
  </el-card>
</template>

<style scoped></style>

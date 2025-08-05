import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { onBeforeUnmount, ref } from "vue"

export function useBasicTemplate() {
  // 场景 scene
  const scene = new THREE.Scene()
  const screenRef = ref<HTMLElement | null>(null)
  let resizeObserver: ResizeObserver | null = null
  const sizes = {
    width: 600,
    height: 600,
  }
  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
  // 代码开头创建一个变量，然后获取在 HTML 中使用创建的元素并将其存储在其中
  const renderer = new THREE.WebGLRenderer()

  function renderWebGL() {
    // 相机
    camera.position.z = 5
    camera.position.x = 4
    camera.position.y = 3
    camera.lookAt(0, 0, 0)

    scene.add(camera)
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
  }

  onBeforeUnmount(() => {
    if (resizeObserver && screenRef.value) {
      resizeObserver.unobserve(screenRef.value)
      resizeObserver.disconnect()
    }
  })

  function init() {
    // 自适应
    renderWebGL()
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
  }

  return {
    scene,
    screenRef,
    renderer,
    init,
  }
}
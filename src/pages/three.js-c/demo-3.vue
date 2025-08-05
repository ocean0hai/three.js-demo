<script setup lang="ts">
import * as THREE from 'three';
// gui的使用方法
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import { onMounted } from 'vue';
import { useBasicTemplate } from '@/hooks/useBasicTemplate';
// 自适应
const { scene, screenRef, init } = useBasicTemplate();

// 创建GUI   （用gui替代上一节点击事件
const gui = new GUI();
// lil gui 调试开发3d效果
const eventObj = {
  fullScreenFn: () => {
    document.body.requestFullscreen();
  },
  exitFullScreenFn: () => {
    document.exitFullscreen();
  },
};
function createGui() {
  // const fullScreen = gui.addFolder('全屏设置') //生成文件夹  添加分组
  gui.add(eventObj, 'fullScreenFn').name('全屏');
  gui.add(eventObj, 'exitFullScreenFn').name('退出全屏');
}

onMounted(() => {
  init();
  createGui();
  loadTexture();
});

// 基础的贴图加载
function loadTexture() {
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(
    'https://threejs.org/examples/textures/crate.gif',
    () => {
      // 加载完成后执行的回调
      console.log('Texture loaded successfully');
    },
    undefined,
    (error) => {
      console.error('An error occurred while loading the texture:', error);
    }
  );

  // 创建一个立方体并应用纹理
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  return cube;
}
</script>

<template>
  <el-card>
    <div id="screen"
      ref="screenRef">
      <div id="test" />
    </div>
  </el-card>
</template>

<style scoped></style>

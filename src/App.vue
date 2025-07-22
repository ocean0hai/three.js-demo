<script lang="ts" setup>
import BaseHeader from './layouts/BaseHeader.vue';
import BaseSide from './layouts/BaseSide.vue';
</script>

<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div class="main-container flex">
      <BaseSide />
      <div w="full" py="2">
        <RouterView />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  text-align: center;
  color: var(--ep-text-color-primary);
}

.main-container {
  height: calc(100vh - var(--ep-menu-item-height) - 4px);
}
</style>

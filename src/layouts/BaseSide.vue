<script lang="ts" setup>
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'
import { setupRouter } from '@/router';
import { useRoute } from "vue-router";
import { computed } from "vue";

function handleOpen(key: string, keyPath: string[]) {
  // eslint-disable-next-line no-console
  // console.log(key, keyPath)
}
function handleClose(key: string, keyPath: string[]) {
  // eslint-disable-next-line no-console
  // console.log(key, keyPath)
}
const routers = setupRouter()
const route = useRoute();
const active = computed(() => {
  return route.path
}) // 需要使用computed才可以获取，不然会是undefined
</script>

<template>
  <el-menu router style="width: 300px;" :default-active="active" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
    <div v-for="item in routers" :key="item.path">
      <el-sub-menu v-if="item?.children && item?.children.length > 0" :index="item.path">
        <template #title>
          <el-icon>
            <IconMenu />
          </el-icon>
          {{ item.meta?.title }}
        </template>
        <el-menu-item v-for="it in item.children" :key="it.path" :index="`${item.path}/${it.path}`">
          <el-icon>
            <IconMenu />
          </el-icon>
          <template #title>
            {{ it.meta?.title }}
          </template>
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item v-else :index="`${item.path}`">
        <template #title>
          <el-icon>
            <IconMenu />
          </el-icon>
          {{ item.meta?.title }}
        </template>
      </el-menu-item>
    </div>
  </el-menu>
</template>

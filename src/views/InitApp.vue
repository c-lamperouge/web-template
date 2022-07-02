<script setup lang="ts">
import { onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { getViewPath, updateViewPath } from '@stores/dBStoreView'

const router = useRouter()

const switchView = async () => {
  try {
    const viewPath = await getViewPath()
    router.push(viewPath)
  } catch {
    router.push('/login')
    updateViewPath('/login')
  }
}

onBeforeMount(switchView)
</script>

<template>
  <div class="white-screen" />
</template>

<style scoped lang="postcss">
.white-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
}
</style>

<script setup lang="ts">
// vue
import { $ref } from 'vue/macros'
// components
import TheHeader from './TheHeader.vue'
import TheAside from './TheAside.vue'
// for view switch
import { ViewName } from '@/AppViewSwitch'

// for aside
let isShowAside = $ref(false)
const isAsidePinned = $ref(false)
const switchAside = () => {
  isShowAside = !isShowAside
}
</script>

<template>
  <div
    class="main-view"
    :data-view-name="ViewName.Main"
  >
    <TheHeader @switch-aside="switchAside" />

    <TheAside
      v-model="isShowAside"
      :is-pinned="isAsidePinned"
    />

    <main>main</main>
  </div>
</template>

<style scoped lang="postcss">
.main-view {
  position: absolute;
  display: block flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  background-color: white;
  box-shadow: var(--shadow-layer);
  overflow-y: auto;
}

main {
  display: block flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}
</style>

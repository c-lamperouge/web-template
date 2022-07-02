<script setup lang="ts">
import './assets/style/base.postcss'
import './assets/style/theme.postcss'
import { useStore } from '@stores/loading'
import BodyOverlay from '@components/BodyOverlay.vue'
import SlotLoading from '@components/OverlaySlotLoading.vue'

const loadingStore = useStore()
</script>

<template>
  <div class="app-transition-container">
    app component
  </div>

  <BodyOverlay
    v-model="loadingStore.isLoading"
    backdrop-theme="light"
    :enable-close="false"
    slot-transition-name="fade"
  >
    <SlotLoading />
  </BodyOverlay>
</template>

<style scoped lang="postcss">
.app-transition-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

/* vue transition class */
.fade-enter-active {
  transition: opacity 0.25s linear 0s;
}

.fade-leave-active {
  transition: opacity 0.25s linear 0s;
}

.fade-enter-from {
  opacity: 0;
}

.fade-leave-to {
  opacity: 0;
}
</style>

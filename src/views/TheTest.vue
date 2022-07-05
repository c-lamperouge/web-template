<script setup lang="ts">
import { useStore } from '@stores/view'
import { ViewName, ViewTransitionType } from '@/AppViewSwitch'

const store = useStore()
const goLoginView = () => {
  store.appViewTransitionType = ViewTransitionType.SlideLeft
  store.appActiveView = ViewName.Login
}
</script>

<template>
  <div
    class="test"
    :data-view-name="ViewName.Test"
  >
    <p>This is the test view.</p>

    <button @click="goLoginView">
      go login
    </button>
  </div>
</template>

<style scoped lang="postcss">
.test {
  position: absolute;
  display: block flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: white;
  box-shadow: var(--shadow-layer);
  color: var(--theme-color);
}
</style>
